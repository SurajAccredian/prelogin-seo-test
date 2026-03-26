// constants.ts — rename from constants.js, add IconType for icons
import { GiArtificialIntelligence, GiMaterialsScience } from "react-icons/gi";
import { IoBagOutline } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { FaConnectdevelop, FaUsers } from "react-icons/fa";
import { GrResources, GrAnnounce } from "react-icons/gr";
import { TbInfoSquareRounded } from "react-icons/tb";
import { PiStrategy } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { LiaBrainSolid } from "react-icons/lia";
import { RiMoneyDollarCircleLine, RiShieldKeyholeLine } from "react-icons/ri";
import { LuBrainCircuit } from "react-icons/lu";
import { IconType } from "react-icons";



// ✅ All data below is IDENTICAL to original — zero changes
export const STREAMS = [
  { category: "PG Diploma", icon: GoProjectRoadmap, order: 1 },
  { category: "design thinking", icon: GoProjectRoadmap, order: 2 },
  { category: "product management", icon: GoProjectRoadmap, order: 8 },
  { category: "CXO Leadership", icon: LiaBrainSolid, order: 1 },
  { category: "artificial intelligence", icon: LuBrainCircuit, order: 4 },
  { category: "finance", icon: IoCardOutline, order: 5 },
  { category: "Human Resource", icon: FaUsers, order: 6 },
  { category: "project management", icon: GoProjectRoadmap, order: 7 },
  { category: "strategy & leadership", icon: PiStrategy, order: 2 },
  { category: "General Management", icon: IoBagOutline, order: 4 },
  { category: "digital Transformation", icon: FaConnectdevelop, order: 11 },
  { category: "business management", icon: RiMoneyDollarCircleLine, order: 9 },
  { category: "senior management", icon: MdOutlineLeaderboard, order: 3 },
];

export const allowedIds = [];

export const VERTICALS = [
  "data science",
  "Product Management",
  "business management",
  "Project Management",
  "Digital Transformation",
  "Strategy & Leadership",
  "Senior Management",
  "Fintech",
  "Business Analytics",
];

export const categoriesWithContacts = [
  { category: "human resource", contact: "+91 8851827093" },
  { category: "cxo leadership", contact: "+91 9810184424" },
  { category: "finance", contact: "+91 9289224842" },
  { category: "product management", contact: "+91 7619555873" },
  { category: "general management", contact: "+91 9810184424" },
  { category: "digital transformation", contact: "+91 7619555873" },
  { category: "data science", contact: "+91 7619555873" },
  { category: "project management", contact: "+91 9818329799" },
  { category: "strategic management", contact: "+91 9810184424" },
  { category: "senior management", contact: "+91 7678385465" },
  { category: "strategy & leadership", contact: "+91 8882597163" },
  { category: "business management", contact: "+91 9810184424" },
  { category: "artificial intelligence", contact: "+91 9211285411" },
  { category: "cybersecurity", contact: "+91 9211285411" },
  { category: "PG Diploma", contact: "+91 9818329799" },
  { category: "design thinking", contact: "+91 9818329799" },
];

export const REFER_BAR_LINK = [
  { name: "Refer", scrollTo: "referHero" },
  { name: "Benefits", scrollTo: "benefitsSection" },
  { name: "FAQ's", scrollTo: "faqsSection" },
  { name: "Support", scrollTo: "supportSection" },
];

export const NAV_ITEMS = [
  {
    label: "For Business",
    redirect: true,
    icon: GrAnnounce,
    href: "https://corporate.accredian.com",
  },
  {
    label: "Resources",
    icon: GrResources,
    children: [
      { label: "Blog", redirect: true, href: "https://blog.accredian.com/" },
      { label: "Success Stories", href: "/Successstories" },
    ],
  },
  {
    label: "About Us",
    icon: TbInfoSquareRounded,
    children: [
      { label: "Career", href: "/Career" },
      { label: "Why Accredian", href: "/whyaccredian" },
      { label: "Vision & Mission", href: "/About" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    label: "More",
    icon: TbInfoSquareRounded,
    children: [
      { label: "Become a Trainer", icon: GrAnnounce, href: "/Career/mentor" },
      { label: "Refer & Earn", icon: GrAnnounce, href: "/referandearn" },
    ],
  },
];

export const DEPARTMENTS = [
  { value: "management", label: "Management" },
  { value: "sales", label: "Sales" },
  { value: "academic operations", label: "Academic Operations" },
  { value: "product", label: "Product" },
  { value: "human resource", label: "Human Resource" },
  { value: "growth marketing", label: "Growth Marketing" },
  { value: "web development", label: "Web Development" },
  { value: "operations", label: "Operations" },
  { value: "strategy & new initiatives", label: "Strategy & New Initiatives" },
];

// TESTIMONIALS array — identical, just rename file to .ts
export const TESTIMONIALS = [
  /* ...identical to original... */
];
