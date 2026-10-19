const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const programsDir = path.join(rootDir, "app/components/Assets/programs");
const sitemapsDir = path.join(rootDir, "public/sitemaps");
const globalSitemapPath = path.join(rootDir, "public/sitemap.xml");

function slugify(text) {
    if (!text) return "other";
    return text
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[\s_]+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

function run() {
    console.log("Syncing sitemaps from programs...");
    // 1. Read all program JSONs
    const programs = [];
    const files = fs.readdirSync(programsDir);
    for (const file of files) {
        if (file.endsWith(".json")) {
            try {
                const content = JSON.parse(fs.readFileSync(path.join(programsDir, file), "utf8"));
                programs.push(content);
            } catch (e) {
                console.error("Error parsing", file, e);
            }
        }
    }

    // 2. Group by vertical
    const groups = {};
    for (const p of programs) {
        let vertical = p.vertical || p.category || "other";
        if (p.id) {
            let slug = slugify(vertical);
            if (!groups[slug]) groups[slug] = [];
            groups[slug].push(p.id);
        }
    }

    // 3. Remove old sitemap-programs-*.xml (except index)
    const existingSitemaps = fs.readdirSync(sitemapsDir);
    for (const sm of existingSitemaps) {
        if (sm.startsWith("sitemap-programs-") && sm !== "sitemap-programs.xml") {
            fs.unlinkSync(path.join(sitemapsDir, sm));
        }
    }

    // 4. Generate new XMLs
    const today = new Date().toISOString().split("T")[0];
    const generatedSitemaps = [];

    for (const [slug, ids] of Object.entries(groups)) {
        const filename = `sitemap-programs-${slug}.xml`;
        generatedSitemaps.push(filename);

        const urls = ids
            .map(
                (id) => `    <url>
        <loc>https://accredian.com/programs/${id}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`
            )
            .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        fs.writeFileSync(path.join(sitemapsDir, filename), xml, "utf8");
        console.log(`Generated ${filename} with ${ids.length} URLs`);
    }

    // 5. Generate sitemap-programs.xml
    const indexSitemaps = generatedSitemaps
        .map(
            (filename) => `    <sitemap>
        <loc>https://accredian.com/sitemaps/${filename}</loc>
        <lastmod>${today}</lastmod>
    </sitemap>`
        )
        .join("\n");

    const progIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexSitemaps}
</sitemapindex>`;

    fs.writeFileSync(path.join(sitemapsDir, "sitemap-programs.xml"), progIndexXml, "utf8");
    console.log(`Updated sitemap-programs.xml`);

    // 6. Update global sitemap.xml
    let globalXml = fs.readFileSync(globalSitemapPath, "utf8");

    // Remove existing program sitemaps entries
    const sitemapRegex = /<sitemap>\s*<loc>[^<]*sitemap-programs[^<]*<\/loc>\s*<lastmod>[^<]*<\/lastmod>\s*<\/sitemap>\s*/g;
    globalXml = globalXml.replace(sitemapRegex, "");

    const toInsert = generatedSitemaps
        .concat(["sitemap-programs.xml"])
        .map(
            (filename) => `    <sitemap>
        <loc>https://accredian.com/sitemaps/${filename}</loc>
        <lastmod>${today}</lastmod>
    </sitemap>\n`
        )
        .join("");

    globalXml = globalXml.replace(/(<sitemapindex[^>]*>)\s*/, `$1\n${toInsert}`);

    fs.writeFileSync(globalSitemapPath, globalXml, "utf8");
    console.log("Updated global sitemap.xml");
    console.log("✅ Sitemaps synced successfully.");
}

run();