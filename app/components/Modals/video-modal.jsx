"use client";

import React from "react";
import Modal from "../ui/Modal";
import { IoIosClose } from "react-icons/io";

export default function HeroModal({ open, setOpen }) {
  const handleClose = () => setOpen(null);

  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      maxWidth="max-w-4xl"
      className="p-0 overflow-hidden font-circular bg-white drop-shadow-xl rounded-xl"
    >
      <div className="py-2 px-4 bg-white border-b border-gray-100 w-full flex justify-end items-center">
        <button
          type="button"
          aria-label="Close"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          onClick={handleClose}
        >
          <IoIosClose className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      <div className="w-full">
        {open && (
          <iframe
            title="Introduction Video"
            src={open}
            className="w-full aspect-video min-h-[40vh]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  );
}
