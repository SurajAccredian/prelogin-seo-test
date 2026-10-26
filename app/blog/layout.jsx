import { Inter } from "next/font/google";
import HomePageWrapper from "../components/Wrapper/HomePageWrapper";
import BlogSubNav from "../components/Blog/BlogSubNav";
import "./blog.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-blog-sans" });

// Wraps every /blog/** page in the site's header/footer plus the blog sub-nav.
// The font and CSS are scoped to .blog-root so nothing leaks to other routes.
export default function BlogLayout({ children }) {
  return (
    <HomePageWrapper>
      <div className={`${inter.variable} blog-root bg-white text-gray-900`}>
        <BlogSubNav />
        <main>{children}</main>
      </div>
    </HomePageWrapper>
  );
}
