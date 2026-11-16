import Drawer from "../../ui/Drawer";
import Image from "next/image";
import { TbLogin2 } from "react-icons/tb";
import AccordionHam from "./AccodionHam";
import AccodionMyAccount from "./AccodionMyAccount";
import { X } from "lucide-react";

const FREE_COURSE_CATEGORIES = [66, 71];
const isFreeCourseCategory = (cat) => FREE_COURSE_CATEGORIES.includes(Number(cat));

export default function Ham({
  isOpen,
  setIsOpen,
  loginStatus,
  LogOut,
  onLoginClick,
}) {
  const hasFreeCourse = Boolean(
    loginStatus &&
    typeof window !== "undefined" &&
    (() => {
      try {
        const enrollmentDetails = JSON.parse(localStorage.getItem("enrollment") || "[]");
        return Array.isArray(enrollmentDetails) && enrollmentDetails.some(
          item => isFreeCourseCategory(item.category || item.category_id)
        );
      } catch {
        return false;
      }
    })()
  );
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const handleLogin = () => {
    setIsOpen(false);
    onLoginClick();
  };

  return (
    <div className="xl:hidden">
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        className="w-[300px] max-w-[85vw] h-full"
      >
        <div className="w-full h-full bg-white p-4 font-circular flex flex-col gap-4 overflow-y-auto custom-scrollbar xl:hidden">
          <div>
            <div className="w-full flex justify-between items-center mt-2 mb-6">
              <Image
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                alt="Accredian logo"
                width={130}
                height={38}
                quality={75}
                style={{ width: "130px", height: "auto" }}
                className="w-[130px] max-w-[130px] h-auto flex-shrink-0"
                priority
              />

              <X
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-700 hover:text-black w-6 h-6 flex-shrink-0"
              />
            </div>
            {loginStatus && <AccodionMyAccount />}
            <AccordionHam />
            {/* Render Login and Try for free sections below AccordionHam if not logged in */}
            {!loginStatus && (
              <div className="mt-4">
                <div
                  onClick={handleLogin}
                  className="w-full flex items-center gap-2 text-white px-4 py-1 bg-universal rounded-md cursor-pointer mb-2"
                >
                  <div className="flex justify-center items-center gap-2 w-full text-center">
                    <TbLogin2 />
                    <span className="font-semibold text-center text-xl">Login</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!hasFreeCourse && (
            <div>
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/referandearn`} target="_blank" rel="noreferrer">
                <Image
                  src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/dropDownBanner-v2.webp"
                  className="w-full h-auto"
                  alt="Refer and earn banner"
                  width={280}
                  height={140}
                  quality={75}
                />
              </a>
            </div>
          )}
          {loginStatus && (
            <div>
              <button
                className="py-2 px-4 w-full hover:text-red-500 bg-red-500 text-white hover:bg-red-400/30 rounded-md cursor-pointer"
                onClick={() => LogOut("token", "accredian.com")}
              >
                <h2 className="font-semibold capitalize">Logout</h2>
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
