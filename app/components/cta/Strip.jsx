import { useState } from "react";
import Rcta from "../cta/request_a_call_back";
// import ReferModal from "../Modals/ReferModal/ReferModal";

const Strip = ({ user }) => {

  const [isReferModalOpen, setisReferModalOpen] = useState(false)
  const [cta, setCta] = useState(false);
  const handleClickOpenRcb = () => {
    setCta(true);
  };
  const RcbhandleClose = () => {
    setCta(false);
  };

  return (
    <div className="w-full bg-universal/15 flex items-center gap-4 justify-between md:justify-center py-4 px-4 font-circular">
      <p className="font-medium text-neutral-800 text-xs md:text-lg flex items-center gap-3">{user ? "Head to your Personalized Dashboard to explore our diverse range of Programs!" : "Navigate your ideal career path with tailored expert advice"} {" "}
        {user ? (
          <a href="https://dashboard.accredian.com/" className="md:mx-2 font-medium text-nowrap text-universal capitalize md:block hidden">{"Explore Dashboard"}</a>
          // <button onClick={() => setisReferModalOpen(!isReferModalOpen)} className="md:mx-2 font-medium text-nowrap text-universal capitalize md:block hidden">{"refer your friend"}</button>
        ) : (
          <button onClick={handleClickOpenRcb} className="md:mx-2 font-medium text-nowrap text-universal capitalize md:block hidden">{"contact expert"}</button>
        )}
      </p>
      {user ? (
        <a href="https://dashboard.accredian.com/" className="md:mx-2 font-semibold text-nowrap text-sm text-universal capitalize block md:hidden">{"Explore Dashboard"}</a>
        // <button onClick={() => setisReferModalOpen(!isReferModalOpen)} className="md:mx-2 font-semibold text-nowrap text-sm text-universal capitalize block md:hidden">{"refer your friend"}</button>
      ) : (
        <button onClick={handleClickOpenRcb} className="md:mx-2 font-semibold text-nowrap text-sm text-universal capitalize block md:hidden">{"contact expert"}</button>
      )}
      <Rcta open={cta} handleClose={RcbhandleClose} source="contact expert" />
      {/* <ReferModal open={isReferModalOpen} setOpen={setisReferModalOpen} /> */}
    </div>
  )
}

export default Strip