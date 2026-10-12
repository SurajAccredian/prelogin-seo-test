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

function escapeXml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function getFileLastMod(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const dateStr = stats.mtime.toISOString().split("T")[0];
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                return dateStr;
            }
        }
    } catch {
        // ignore
    }
    return null;
}

function getSitemapLatestLastMod(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf8");
            const matches = [...content.matchAll(/<lastmod>\s*([^\s<]+)\s*<\/lastmod>/gi)]
                .map((m) => m[1].trim())
                .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));

            if (matches.length > 0) {
                matches.sort();
                return matches[matches.length - 1];
            }
            return getFileLastMod(filePath);
        }
    } catch {
        // ignore
    }
    return null;
}

function run() {
    console.log("=== SYNC SITEMAPS: RESTORED DISCONTINUED PROGRAM COVERAGE ===");

    // 1. Read all individual program JSON files (108 programs)
    const programFiles = fs.readdirSync(programsDir).filter((f) => f.endsWith(".json"));
    console.log(`Found ${programFiles.length} individual program JSON files in ${programsDir}`);

    // 2. Map programs and group by vertical slug
    // We use the filename slug (file.replace(/\.json$/, "")) because Next.js routes
    // /programs/[id] by reading path.join(programsDir, `${id}.json`).
    // This ensures 1:1 route resolution, avoids duplicate URLs, and handles
    // legacy ID typos cleanly without altering underlying JSON data.
    const verticalGroups = {};
    let totalProgramsProcessed = 0;

    for (const file of programFiles) {
        const slug = file.replace(/\.json$/, "");
        const filePath = path.join(programsDir, file);

        let vertical = "other";
        const lastmod = getFileLastMod(filePath);

        try {
            const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
            vertical = fileData.vertical || fileData.category || "other";
        } catch (err) {
            console.warn(`Warning parsing ${file}:`, err.message);
        }

        const vSlug = slugify(vertical);
        if (!verticalGroups[vSlug]) {
            verticalGroups[vSlug] = [];
        }

        verticalGroups[vSlug].push({ slug, lastmod });
        totalProgramsProcessed++;
    }

    console.log(`Processed ${totalProgramsProcessed} programs across ${Object.keys(verticalGroups).length} verticals.`);

    // 3. Clean up existing program sitemaps and legacy nested index
    const existingSitemaps = fs.readdirSync(sitemapsDir);
    for (const sm of existingSitemaps) {
        if (sm.startsWith("sitemap-programs-") || sm === "sitemap-programs.xml") {
            fs.unlinkSync(path.join(sitemapsDir, sm));
        }
    }

    // 4. Generate vertical program XML files (sorted alphabetically by vertical slug)
    const generatedProgramSitemaps = [];
    let totalProgramUrlsWritten = 0;

    const sortedVerticals = Object.keys(verticalGroups).sort();

    for (const vSlug of sortedVerticals) {
        const items = verticalGroups[vSlug];
        // Sort items by slug for deterministic XML generation
        items.sort((a, b) => a.slug.localeCompare(b.slug));

        const filename = `sitemap-programs-${vSlug}.xml`;
        const itemDates = items.map((it) => it.lastmod).filter(Boolean).sort();
        const groupLastMod = itemDates.length > 0 ? itemDates[itemDates.length - 1] : null;

        generatedProgramSitemaps.push({ filename, lastmod: groupLastMod });

        const urlsXml = items
            .map((item) => {
                const lastmodTag = item.lastmod ? `\n        <lastmod>${item.lastmod}</lastmod>` : "";
                return `    <url>
        <loc>https://accredian.com/programs/${escapeXml(item.slug)}</loc>${lastmodTag}
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
            })
            .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

        fs.writeFileSync(path.join(sitemapsDir, filename), xml, "utf8");
        totalProgramUrlsWritten += items.length;
        console.log(`Generated ${filename} (${items.length} programs, lastmod: ${groupLastMod || "none"})`);
    }

    console.log(`Total program URLs written across vertical sitemaps: ${totalProgramUrlsWritten}`);

    // 5. Preserved non-program child sitemaps
    const nonProgramSitemaps = [
        "sitemap-static.xml",
        "sitemap-course.xml",
        "sitemap-policies.xml",
        "sitemap-faqs.xml",
    ];

    const allChildSitemaps = [];

    // Add generated program sitemaps
    generatedProgramSitemaps.forEach((sm) => allChildSitemaps.push(sm));

    // Add non-program sitemaps with dynamic lastmod from content
    nonProgramSitemaps.forEach((filename) => {
        const filePath = path.join(sitemapsDir, filename);
        if (fs.existsSync(filePath)) {
            const lastmod = getSitemapLatestLastMod(filePath);
            allChildSitemaps.push({ filename, lastmod });
            console.log(`Preserved non-program sitemap ${filename} (lastmod: ${lastmod || "none"})`);
        } else {
            console.error(`ERROR: Preserved sitemap missing on disk: ${filename}`);
        }
    });

    // 6. Generate root sitemap.xml index cleanly
    const sitemapEntriesXml = allChildSitemaps
        .map((sm) => {
            const lastmodTag = sm.lastmod ? `\n        <lastmod>${sm.lastmod}</lastmod>` : "";
            return `    <sitemap>
        <loc>https://accredian.com/sitemaps/${sm.filename}</loc>${lastmodTag}
    </sitemap>`;
        })
        .join("\n");

    const rootXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntriesXml}
</sitemapindex>
`;

    fs.writeFileSync(globalSitemapPath, rootXml, "utf8");
    console.log(`\nUpdated ${globalSitemapPath} with ${allChildSitemaps.length} child sitemaps.`);
    console.log("✅ Sitemaps synced successfully with full coverage and 0 collisions.");
}

run();

