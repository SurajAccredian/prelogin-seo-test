import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { spotlightMap, spotlightGroups } from "../../lib/blog/constants";
import { getNonEmptySpotlightKeys } from "../../lib/blog/spotlight";
import { blogMetadata } from "../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../lib/blog/schema";
import { JsonLd } from "../../components/JsonLd";

export const revalidate = 3600;

export const metadata = blogMetadata({
  title: "Spotlight | Accredian Blog",
  description: "Career transition stories, industry insights, and alumni spotlights from the Accredian community.",
  path: "/spotlight",
});

// Crawlable index: a plain server-rendered link to every spotlight page that has articles, grouped like the
// site nav. (The legacy landing only showed 7 featured tiles; the rest were reachable only from the nav.)
export default async function SpotlightIndex() {
  const nonEmpty = new Set(await getNonEmptySpotlightKeys());
  const groups = spotlightGroups
    .map((group) => ({ ...group, keys: group.keys.filter((key) => nonEmpty.has(key)) }))
    .filter((group) => group.keys.length > 0);

  return (
    <div className="py-16 md:py-24">
      <JsonLd data={blogBreadcrumbGraph("/spotlight", [["Spotlight", "/spotlight"]])} />
      <div className="container mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-6">
            <Star className="w-8 h-8 text-primary-600 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Accredian{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Spotlight</span>
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Career transition stories, industry insights, and alumni spotlights from the Accredian community.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`spotlight-${group.title}`}>
              <h2 id={`spotlight-${group.title}`} className="text-2xl font-bold text-gray-900 mb-6">
                {group.title}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.keys.map((key) => (
                  <li key={key}>
                    <Link
                      href={`/blog/spotlight/${key}`}
                      className="block h-full p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary-300 transition-colors"
                    >
                      <span className="block text-lg font-bold text-gray-900 mb-1">{spotlightMap[key].name}</span>
                      <span className="block text-sm text-gray-500">{spotlightMap[key].description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
