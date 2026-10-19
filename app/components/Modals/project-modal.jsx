import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IoIosClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

export default function ProjectModal({ open, setOpen }) {

  const { data } = useSelector(state => state.program)
  const [projects, setProjects] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data) {
      setProjects(data?.projects);
      const index = data?.projects?.findIndex(project => project === open);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [data, open]);

  const handleClose = () => setOpen(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    setOpen(projects[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setOpen(projects[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open ? true : false}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open ? true : false}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
          }}>
            <div className='flex justify-center items-center gap-4 font-circular'>
              <button className='p-2 border bg-white rounded-full rotate-180 md:block hidden' onClick={handlePrevious}>
                <IoIosArrowForward />
              </button>
              <div className='bg-white drop-shadow-xl rounded-xl overflow-hidden'>
                <div className='py-2 px-2 bg-white drop-shadow w-full flex justify-end items-center'>
                  <div className='w-8 h-8 flex-shrink-0 cursor-pointer' onClick={handleClose}>
                    <IoIosClose className='w-full h-full' />
                  </div>
                </div>
                <div className='lg:w-[50vw] md:w-[70vw] w-[90vw] lg:h-[60vh] min-h-[60vh] py-8 px-5 flex flex-col justify-between'>
                  <div className='w-full'>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-20 h-20 3xl:w-[10vw] 3xl:h-[10vw] flex-shrink-0 rounded-md bg-white overflow-hidden'>
                        <img className='w-full h-full object-contain' src={open?.icon} alt={open?.title} />
                      </div>
                    </div>
                    <h4 className='text-neutral-500 mt-2 text-base 3xl:text-[1.2vw]'>{open?.category}</h4>
                    <h2 className='text-xl font-semibold mt-2 3xl:text-[2vw] 3xl:leading-[2vw]'>{open?.title}</h2>
                    <p className='text-neutral-500 text-base 3xl:text-[0.8] font-medium mt-4'>{open?.description}</p>
                  </div>
                  <div className='w-full'>
                    <div className='w-full border-b border-neutral-300 my-4' />
                    <div className='w-full'>
                      <h4 className='text-sm font-medium mt-2'>Skill you'll gain : </h4>
                      <div className='w-full mt-2'>
                        <div className='flex gap-2 items-center flex-wrap'>
                          {open?.skills?.map((skill, index) => (
                            <div key={index} className='px-4 py-2 rounded-xl bg-neutral-100 border border-neutral-300'>
                              <h1 className='font-semibold text-nowrap text-xs'>{skill}</h1>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full flex items-center justify-between px-5 py-4'>
                  <div className='flex md:hidden items-center gap-2 cursor-pointer' onClick={handlePrevious}>
                    <button className='p-2 border bg-white rounded-full rotate-180'>
                      <IoIosArrowForward />
                    </button>
                    <h1 className='text-base font-semibold text-neutral-500'>Previous</h1>
                  </div>
                  <div className='flex md:hidden items-center gap-2 cursor-pointer' onClick={handleNext}>
                    <h1 className='text-base font-semibold text-neutral-500'>Next</h1>
                    <button className='p-2 border bg-white rounded-full' >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>
              </div>
              <button className='p-2 border bg-white rounded-full md:block hidden' onClick={handleNext}>
                <IoIosArrowForward />
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
