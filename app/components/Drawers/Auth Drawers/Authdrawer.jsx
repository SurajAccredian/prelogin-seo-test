import React from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import LoginDrawer from "./LoginDrawer";

function Authdrawer({ isOpen, onClose }) {
  // const { isOpen: authIsOpen, onClose: authOnClose } = useDisclosure();

  const handleCloseAll = () => {
    onClose();
  };
  return (
    <>
      <ChakraProvider>
        <LoginDrawer onClose={onClose} isOpen={isOpen} />
      </ChakraProvider>
    </>
  );
}

export default Authdrawer;
