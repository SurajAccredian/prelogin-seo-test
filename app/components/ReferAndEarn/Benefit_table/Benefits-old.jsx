import React, { useState } from "react";
import Image from "next/image";
import BenefitTable from "../Stream_section/BenefitTable";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReferModal from "../../Modals/ReferModal/Prelogin-Refer-Modal";
import "../refer.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";
import benefitOnReferral from "../../../Assets/constants/programs.json";
import { STREAMS } from "../../../Assets/constants/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Benefits = () => {
  // console.log(programs);

  // state to get selected vertical
  const [selectedVertical, setSelectedVertical] = useState("cfo");
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const [isEnrolled, setIsEnrolled] = useState(true);
  //table cloumn names
  const columnNames = ["Programs", "Referrer Bonus", "Referee Bonus"];

  //Toggle switch CSS
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#1A73E8",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "white",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      color: "#1A73E8",
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      border: "1px solid gray",
      opacity: 1,
      backgroundColor: "#deeafa",
      boxSizing: "border-box",
    },
  }));

  //function to change state of vertical and toggle
  const handleChange = (event) => {
    setSelectedVertical(event.target.value);
  };
  const handleToggle = (event) => {
    setIsEnrolled(event.target.checked);
  };

  const categories = Object.keys(groupProgramsByCategory(benefitOnReferral));

  const categoryOrderMap = STREAMS.reduce((acc, { category, order }) => {
    acc[category.toLowerCase()] = order;
    return acc;
  }, {});

  const vertical = categories.sort((a, b) => {
    const orderA = categoryOrderMap[a.trim().toLowerCase()];
    const orderB = categoryOrderMap[b.trim().toLowerCase()];
    return orderA - orderB;
  });

  return (
    <div
      id="benefitsSection"
      className="flex flex-col justify-center items-center relative w-full xl:px-12 px-0 my-5"
    >
      <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-center font-circular">
        What are the <span className="text-universal">Referral Benefits?</span>
      </h2>
      <div className="upper-panel w-full max-w-[85rem] flex justify-between lg:justify-end items-center pt-5 md:pt-6">
        <div className="lg:hidden px-4 sm:px-5 lg:px-5 xl:px-1 font-circular">
          {/* MUI dropdown component */}
          <FormControl sx={{ width: "140px" }} size="small">
            <Select
              value={selectedVertical}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              // input={<OutlinedInput label="Select Program" />}
              MenuProps={MenuProps}
              sx={{
                textTransform:
                  selectedVertical?.toLowerCase() === "cxo"
                    ? "uppercase"
                    : "capitalize",
                fontFamily: "circular",
              }}
            >
              <MenuItem
                value=""
                disabled
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  minWidth: "38px",
                }}
              >
                Select Category
              </MenuItem>
              {vertical.map((vertical_name, index) => (
                <MenuItem
                  key={index}
                  value={vertical_name}
                  sx={{
                    textTransform:
                      vertical_name?.toLowerCase() === "cxo"
                        ? "uppercase"
                        : "capitalize",
                    fontSize: "14px",
                    minWidth: "38px",
                  }}
                >
                  {vertical_name.toLowerCase() === "data science & ai"
                    ? "Data Science & AI"
                    : vertical_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center gap-2 px-5 sm:px-5 lg:px-5 xl:px-1 font-circular">
          <span className="text-sm md:text-lg text-gray-600 font-semibold">
            {isEnrolled ? "Enrolled" : "Non Enrolled"}
          </span>{" "}
          <AntSwitch
            alignItems="center"
            checked={isEnrolled}
            onChange={handleToggle}
            inputProps={{ "aria-label": "Enrolled" }}
          />
        </div>
      </div>
      {/* Left section of verticals */}
      <div className="w-full max-w-[85rem] flex gap-6 justify-center items-start lg:justify-between relative xl:px-0 px-4 py-5 pt-1 md:py-10 md:pt-2">
        <div className="left-list hidden lg:flex sticky top-5">
          <div
            className="flex flex-col border rounded-customSm overflow-hidden h-max"
            style={{ boxShadow: "0px 1px 24.4px 1px #00000029" }}
          >
            {vertical.map((vertical_name, index) => (
              <div className="flex flex-col items-center w-full" key={index}>
                <div
                  className={`w-full p-4 uppercase flex items-center justify-between gap-5 hover:cursor-pointer font-semibold hover:bg-gray-100 font-circular ${
                    selectedVertical === vertical_name
                      ? "bg-universal text-white hover:bg-universal shadow-lg"
                      : ""
                  }`}
                  onClick={() => setSelectedVertical(vertical_name)}
                >
                  <p
                    className={`text-gray-700 text-sm ${
                      selectedVertical === vertical_name ? "text-white" : ""
                    }`}
                  >
                    {vertical_name}
                  </p>
                  <div className="w-2.5">
                    <Image
                      src={
                        selectedVertical === vertical_name
                          ? "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/right-arrow-2.webp"
                          : "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/arrow-white-2.webp"
                      }
                      alt="Open"
                      width={10}
                      height={10}
                      className="w-2.5 h-auto"
                    />
                  </div>
                </div>
                {/* Exclude hr from last row/item */}
                {index !== vertical.length - 1 &&
                selectedVertical !== vertical_name ? (
                  <hr className="h-[1.4px] rounded-full w-10/12 bg-gray-300" />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="right-table w-full lg:w-9/12">
          {/* Right side table with program, referrer and referee bonus data */}
          <BenefitTable
            selectedVertical={selectedVertical}
            enrolled={isEnrolled}
            columnNames={columnNames}
          />
        </div>
      </div>
      <button
        className="text-sm drop-shadow-xl xl:text-base font-medium xl:px-6 xl:py-2 px-5 py-1.5 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px] capitalize cursor-pointer font-circular"
        onClick={handleModalOpen}
      >
        Refer now
      </button>
      <ReferModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Benefits;
