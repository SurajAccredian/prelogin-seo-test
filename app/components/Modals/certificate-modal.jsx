"use client";

import React from "react";
import Image from "next/image";
import Modal from "../ui/Modal";
import { IoIosClose } from "react-icons/io";

export default function CertificateModal({
  open,
  showImage,
  handleClose,
}) {
  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      maxWidth="max-w-4xl"
      className="p-0 overflow-hidden font-circular bg-transparent shadow-none"
    >
      <div className="overflow-hidden font-circular">
        <div className="py-2 w-full relative flex items-center justify-end">
          <button
            type="button"
            aria-label="Close"
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center cursor-pointer shadow hover:bg-gray-100 transition"
            onClick={handleClose}
          >
            <IoIosClose className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="bg-white max-h-[85vh] overflow-y-auto py-4 sm:py-6 px-4 sm:px-5 rounded-2xl shadow-2xl flex items-center justify-center">
          {showImage && (
            <Image
              src={showImage}
              alt="Program Certificate"
              width={900}
              height={650}
              quality={75}
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full h-auto object-contain max-h-[75vh]"
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
