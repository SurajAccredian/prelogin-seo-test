import { IoIosClose } from "react-icons/io";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

const CertificateDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "733px",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

export default function CertificateModal({
  open,
  showImage,
  handleClose
}) {


  return (
    <div>
      <CertificateDialog open={open ? true : false} onClose={handleClose}>
        <div className="overflow-hidden font-circular">
          <div className="py-2 w-full text-center relative flex items-center justify-end">
            {/* <h1 className="text-lg font-medium text-neutral-800 text-center">Don't miss the opportunities</h1> */}
            <div
              className="w-8 h-8 rounded-lg bg-white flex-shrink-0 cursor-pointer justify-self-end"
              onClick={handleClose}
            >
              <IoIosClose className="w-full h-full" />
            </div>
          </div>
          <div className="bg-white max-h-[80vh] custom-scrollbar overflow-y-auto py-6 px-5 rounded-xl">
            <img
              src={showImage}
              alt="certificate"
              className="xl:w-[45vw] lg:w-[60vw] md:w-[80vw] 3xl:w-[85rem] w-full"
            />
          </div>
        </div>
      </CertificateDialog>
    </div>
  );
}
