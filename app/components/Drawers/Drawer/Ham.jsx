import Drawer from "@mui/material/Drawer";
import { TbLogin2 } from "react-icons/tb";
import AccordionHam from "./AccodionHam";
import AccodionMyAccount from "./AccodionMyAccount";
import { X } from "lucide-react";

const FREE_COURSE_CATEGORIES = [66, 70, 71];
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
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        <div className="w-full bg-white p-4 font-circular flex flex-col overflow-y-auto custom-scrollbar xl:hidden">
          <div className="flex-grow">
            <div className="w-full flex justify-between items-center mt-2 mb-6">
              <img
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                alt="logo"
                className="max-w-[130px] w-full"
              />

              <X
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              />
            </div>
            {loginStatus && <AccodionMyAccount />}
            <AccordionHam />
            {/* Render Login and Try for free sections below AccordionHam if not logged in */}
            {!loginStatus && (
              <div className="mt-auto ">
                <div
                  onClick={handleLogin}
                  className="w-full flex items-center gap-2 text-white px-4 py-1 bg-universal rounded-md cursor-pointer mb-2 mt-4"
                >
                  <div className="flex justify-center items-center gap-2 w-full text-center">
                    <TbLogin2 />
                    <span className="font-semibold text-center text-xl">Login</span>
                  </div>
                </div>
                {/* <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://trial.accredian.com"
                  className="mt-2"
                >
                  <div className="w-full flex items-center gap-2 text-lg text-universal px-4 py-1 bg-blue-200/15 rounded-sm cursor-pointer">
                    <h1 className="font-semibold w-full text-center">
                      Try for free
                    </h1>
                  </div>
                </a> */}
              </div>
            )}
          </div>
          {!hasFreeCourse && (
            <div>
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/referandearn`} target="_blank" rel="noreferrer">
                <img src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/dropDownBanner-v2.webp" className="" alt="Refer and earn banner" />
              </a>
            </div>
          )}
          {loginStatus && (
            <>
              <button
                className="py-2 px-4 w-full hover:text-red-500 bg-red-500 text-white hover:bg-red-400/30 rounded-md cursor-pointer"
                onClick={() => LogOut("token", "accredian.com")}
              >
                <h2 className="font-semibold capitalize">Logout</h2>
              </button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}
