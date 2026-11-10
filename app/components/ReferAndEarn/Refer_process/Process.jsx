"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReferModal from "../../Modals/ReferModal/Prelogin-Refer-Modal"
import "../refer.css";

const Process = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen)
  };


  return (
    <div className="w-full xl:px-12 px-4 py-4 md:py-6 lg:py-8 bg-lightBackground md:my-12 my-4">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-center font-circular">
          How Do I <span className="text-universal">Refer?</span>
        </h2>
        <div className="w-full md:w-9/12 lg:10/12 hidden md:flex items-center justify-center">
          <Image
            width={1100}
            height={270}
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="w-full h-auto"
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/ref-process-horizontal-v2.svg"
            alt="How to refer"
          />
        </div>
        <div className="w-8/12 flex md:hidden items-center justify-center">
          <Image
            width={400}
            height={600}
            sizes="(max-width: 768px) 70vw, 400px"
            className="w-full h-auto"
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/ref-process-vertical-v2.svg"
            alt="How to refer"
          />
        </div>
        <div className="flex items-center justiy-center font-circular">
          <a
            className="text-sm drop-shadow-xl xl:text-base font-medium xl:px-6 xl:py-2 px-5 py-1.5 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px] capitalize cursor-pointer"
            onClick={handleModalOpen}
          >
            Refer now
          </a>
        </div>
      </div>
        <ReferModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Process;
