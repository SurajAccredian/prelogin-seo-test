import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { STREAMS } from "../../../Assets/constants/constants"

const ExploreDrawerParent = ({ isOpen, onClose, handleInnerOpen }) => {

  const sortedStreams = STREAMS.slice().sort((a, b) => a.order - b.order);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mx={"4px"} />
        <DrawerHeader mx={"4px"}>Explore <span className='text-universal'>Programs</span></DrawerHeader>
        <DrawerBody>
          <div className='w-full flex flex-col gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar py-6 px-1'>
            {sortedStreams.map((val, index) => (
              <div className={`w-full rounded-md drop-shadow-md flex items-center justify-between gap-3 px-4 py-2.5 bg-white text-black cursor-pointer`} key={index} onClick={() => handleInnerOpen(val.category)}>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4'>
                    <val.icon className={`w-full h-full text-slate-900`}></val.icon>
                  </div>
                  <span className='font-semibold text-nowrap text-sm capitalize'>{val.category}</span>
                </div>
                <div className='w-5 h-5'>
                  <svg className='w-full h-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke={"#222222"} strokeWidth="1.3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default ExploreDrawerParent