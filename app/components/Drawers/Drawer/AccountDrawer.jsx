import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { Avatar } from "@chakra-ui/react";
import React from "react";
function AccountDrawer({ isOpen, onClose }) {

  const [filepath, setFilepath] = useState(
    localStorage.getItem("profileURL") ? localStorage.getItem("profileURL") : ""
  );
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    onClose();
  };
  return (
    <div className="lg:hidden">
      <Drawer
        anchor={"right"}
        size={"full"}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <div className=" h-screen bg-white p-4 font-circular">
          <div className="w-[300px] flex flex-col gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar py-6 px-1">
            <div className="flex items-center gap-2 max-w-[160px] cursor-pointer hover:bg-blue-200/30 py-2 px-3 rounded-md">
              <Avatar
                bg="#1A73E8"
                size={"sm"}
                src={filepath ? filepath : ""}
                w="40px" // Sets width to 40px
                h="40px" // Sets height to 40px
                borderRadius="full" // Ensures it's fully rounded
              />
              <h2 className="font-medium truncate">
                {localStorage.getItem("name")}
              </h2>
            </div>
            <div
              className={`w-full rounded-md drop-shadow-md flex items-center justify-between gap-3 px-4 py-2.5 bg-white text-black cursor-pointer`}
            >
              <div className="w-5 h-5">
                <svg
                  className="w-full h-full"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke={"#222222"}
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`w-full rounded-md drop-shadow-md flex items-center justify-between gap-3 px-4 py-2.5 bg-white text-black cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-nowrap text-sm capitalize">
                  My Applications
                </h1>
              </div>
              <div className="w-5 h-5">
                <svg
                  className="w-full h-full"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke={"#222222"}
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`w-full rounded-md drop-shadow-md flex items-center justify-between gap-3 px-4 py-2.5 bg-white text-black cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-nowrap text-sm capitalize">
                  My Courses
                </h1>
              </div>
              <div className="w-5 h-5">
                <svg
                  className="w-full h-full"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke={"#222222"}
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`w-full rounded-md drop-shadow-md flex items-center justify-between gap-3 px-4 py-2.5 bg-red-500 text-white cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-nowrap text-sm capitalize">
                  Logout
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default AccountDrawer;
