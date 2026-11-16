"use client";

import Image from 'next/image';
import Modal from "../ui/Modal";
import { IoIosClose, IoIosArrowForward } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function ProjectModal({ open, setOpen }) {
  const { data } = useSelector(state => state.program);
  const projects = useMemo(() => data?.projects || [], [data]);
  const currentIndex = useMemo(() => {
    if (!open || !projects.length) return 0;
    const index = projects.findIndex(project => project === open);
    return index !== -1 ? index : 0;
  }, [projects, open]);

  const handleClose = () => setOpen(null);

  const handleNext = () => {
    if (!projects.length) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    setOpen(projects[nextIndex]);
  };

  const handlePrevious = () => {
    if (!projects.length) return;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setOpen(projects[prevIndex]);
  };

  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      maxWidth="max-w-4xl"
      className="p-0 overflow-hidden font-circular bg-transparent shadow-none"
    >
      <div className='flex justify-center items-center gap-4 font-circular'>
        <button
          type="button"
          aria-label="Previous project"
          className='p-2 border bg-white rounded-full rotate-180 md:block hidden hover:bg-gray-100 transition shadow'
          onClick={handlePrevious}
        >
          <IoIosArrowForward />
        </button>

        <div className='bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-2xl'>
          <div className='py-2 px-4 bg-white border-b border-gray-100 w-full flex justify-end items-center'>
            <button
              type="button"
              aria-label="Close"
              className='w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition'
              onClick={handleClose}
            >
              <IoIosClose className='w-6 h-6 text-gray-700' />
            </button>
          </div>

          <div className='w-full py-6 px-6 flex flex-col justify-between min-h-[40vh] max-h-[75vh] overflow-y-auto'>
            <div className='w-full'>
              <div className='w-full flex items-center justify-between'>
                <div className='w-20 h-20 flex-shrink-0 rounded-md bg-white overflow-hidden'>
                  {open?.icon && (
                    <Image
                      className='w-full h-full object-contain'
                      src={open.icon}
                      alt={open?.title || "Project icon"}
                      width={80}
                      height={80}
                      quality={75}
                      sizes="80px"
                    />
                  )}
                </div>
              </div>
              <h4 className='text-neutral-500 mt-2 text-base'>{open?.category}</h4>
              <h2 className='text-xl font-semibold mt-2 text-gray-900'>{open?.title}</h2>
              <p className='text-neutral-600 text-base font-normal mt-4'>{open?.description}</p>
            </div>

            <div className='w-full mt-6'>
              <div className='w-full border-b border-neutral-200 my-4' />
              <div className='w-full'>
                <h4 className='text-sm font-semibold text-gray-800 mt-2'>Skills you&apos;ll gain:</h4>
                <div className='w-full mt-2'>
                  <div className='flex gap-2 items-center flex-wrap'>
                    {open?.skills?.map((skill, index) => (
                      <div key={index} className='px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200'>
                        <span className='font-medium text-nowrap text-xs text-gray-800'>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50'>
            <div className='flex md:hidden items-center gap-2 cursor-pointer' onClick={handlePrevious}>
              <button type="button" aria-label="Previous" className='p-2 border bg-white rounded-full rotate-180'>
                <IoIosArrowForward />
              </button>
              <span className='text-sm font-semibold text-neutral-600'>Previous</span>
            </div>
            <div className='flex md:hidden items-center gap-2 cursor-pointer' onClick={handleNext}>
              <span className='text-sm font-semibold text-neutral-600'>Next</span>
              <button type="button" aria-label="Next" className='p-2 border bg-white rounded-full'>
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Next project"
          className='p-2 border bg-white rounded-full md:block hidden hover:bg-gray-100 transition shadow'
          onClick={handleNext}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </Modal>
  );
}
