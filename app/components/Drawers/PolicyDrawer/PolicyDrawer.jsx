import { ChakraProvider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import { POLICIES } from "../../Assets/admission-policies"


const PolicyDrawer = ({ isOpen, onClose, id }) => {


  return (
    <ChakraProvider>
      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mx={"4px"} color={"#1A73E8"} />
          <DrawerHeader mx={"4px"} py={"1rem"}>Admission Policies</DrawerHeader>
          <DrawerBody position={"relative"}>
            <div
              className='w-full flex relative flex-col gap-1 max-h-[60vh] overflow-y-auto custom-scrollbar'
              data-lenis-prevent
            >
              {POLICIES.map((policy, index) => (
                <Link href={`/policies/${policy.tab}`} prefetch={false} className={`w-full ${id === policy.tab ? "bg-universal drop-shadow text-white rounded" : "border-b border-dashed border-universal text-neutral-600"} px-3 py-2  mt-2 cursor-pointer flex items-center justify-between gap-4`} key={index} onClick={() => onClose()}>
                  <span className='font-medium text-base'>
                    {policy.title}
                  </span>
                  <div className='w-5 h-5 flex-shrink-0'>
                    <svg className='w-full h-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke={id === policy.tab ? "#fff" : "#1A73E8"} strokeWidth="1.3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default PolicyDrawer