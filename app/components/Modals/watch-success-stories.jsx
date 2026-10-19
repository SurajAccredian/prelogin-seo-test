"use client";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IoIosClose } from "react-icons/io";

export default function WatchSuccessStoriesModal({ open, setOpen }) {

  const handleClose = () => setOpen(null);

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
            <div className='bg-white drop-shadow-xl rounded-xl overflow-hidden font-circular'>
              <div className='py-2 px-4 bg-white drop-shadow w-full flex justify-end items-center'>
                <div className='w-8 h-8 flex-shrink-0 cursor-pointer' onClick={handleClose}>
                  <IoIosClose className='w-full h-full' />
                </div>
              </div>
              <div className='flex flex-col justify-between'>
                {open && <iframe title="Introduction Video" src={open} className="md:w-[70vw] w-[90vw] lg:h-[70vh] min-h-[40vh]"></iframe>}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
