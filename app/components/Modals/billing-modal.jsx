import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";

export default function BillingModal({ open, setOpen }) {
  const handleClose = () => setOpen(null);
  const { data } = useSelector((state) => state.program);

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
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "none",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="overflow-hidden font-circular flex flex-col max-h-[90vh]">
              {/* Fixed header with close button */}
              <div className="py-2 w-full text-center relative flex items-center justify-end flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-lg bg-white flex-shrink-0 cursor-pointer justify-self-end"
                  onClick={handleClose}
                >
                  <IoIosClose className="w-full h-full" />
                </div>
              </div>

              {/* Scrollable content */}
              <div className="bg-white xl:w-[50vw] lg:w-[70vw] md:w-[80vw] w-[90vw] py-8 px-5 rounded-xl overflow-y-auto">
                <h1 className="font-semibold text-neutral-600 text-center text-lg">
                  EMI Solutions Available for Program Enrollment
                </h1>
                <table className="w-full mt-4 table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="border max-md:hidden border-neutral-200 px-4 py-2"></th>
                      <th className="border border-neutral-200 px-4 py-2">
                        Months
                      </th>
                      <th className="border border-neutral-200 px-4 py-2">
                        {data.id === "executive-general-management-program"
                          ? "EMI (Range)"
                          : "EMI"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {open &&
                      open.monthly_emi.map((val, index) => {
                        return (
                          <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-blue-50" : ""}`}
                          >
                            <td
                              className={`border-r max-md:hidden ${index % 2 === 0
                                ? "border-neutral-300"
                                : "border-neutral-200"
                                } px-4 py-2 text-center`}
                            >
                              {index + 1}
                            </td>
                            <td
                              className={`border-x ${index % 2 === 0
                                ? "border-neutral-300"
                                : "border-neutral-200"
                                } px-4 py-2 text-center`}
                            >
                              {val.months} Months
                            </td>
                            <td
                              className={`border-l ${index % 2 === 0
                                ? "border-neutral-300"
                                : "border-neutral-200"
                                } px-4 py-2 text-center`}
                            >
                              {typeof val.emi === "number"
                                ? `INR ${val.emi.toLocaleString("en-IN")}`
                                : val.emi}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="w-full mt-4">
                  <ol className="list-disc pl-4">
                    <li className="my-2">
                      <h1 className="text-sm text-neutral-500 font-normal">
                        The application fee, a non-refundable reservation
                        deposit for the program, must be paid before the
                        application process can begin and will be adjusted
                        against the final fee payable by the student.
                      </h1>
                    </li>
                    <li className="my-2">
                      <h1 className="text-sm text-neutral-500 font-normal">
                        Please be aware that the credit facility is provided by
                        a third-party provider, and any arrangements with them
                        are beyond the purview of both Accredian and the
                        institute.
                      </h1>
                    </li>
                    <li className="my-2">
                      <h1 className="text-sm text-neutral-500 font-normal">
                        The EMI plan agreed upon with the third-party loan
                        provider will continue as per the terms discussed during
                        the enrollment period
                      </h1>
                    </li>
                    <li className="my-2">
                      <h1 className="text-sm text-neutral-500 font-normal">
                        Please note that these EMI amounts are approximate and
                        may vary slightly depending on the third-party loan
                        provider
                      </h1>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
