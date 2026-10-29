import { blogMetadata } from "../../lib/blog/seo";
import ArticlesListing from "../../components/Blog/ArticlesListing";

export const revalidate = 3600;

export const metadata = blogMetadata({
  title: "All Blog Posts | Accredian",
  description: "Browse all articles, tutorials, and insights from Accredian.",
  path: "/articles",
});

// Page 1 of the listing. Pages 2+ live at /blog/articles/page/<n>.
export default function BlogListing() {
  return <ArticlesListing page={1} />;
}
