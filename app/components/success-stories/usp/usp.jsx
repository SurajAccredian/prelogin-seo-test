import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";

import "./usp.css"

const USP = () => {

  return (
    <div className='success-stories-usp second-bg-grad w-full flex justify-center py-12 xl:px-12 px-4 font-circular'>
      <div className='w-full max-w-[85rem]'>
        <div className="w-full text-center">
          <h4 className="text-base font-medium">Powering Your Potential <span className="text-universal">Proven Results</span> You Can Trust</h4>
          <h2 className='text-2xl md:text-3xl mt-2 font-semibold'>Our <span className='text-universal'>Strengths</span> at a Glance</h2>
        </div>
        <div className='flex justify-center mt-12'>
          <div className='w-full max-w-[75rem] flex justify-center flex-wrap lg:grid lg:grid-cols-3 place-items-center gap-4 md:gap-8'>
            <div className='USP-card-bg-image max-md:max-w-sm w-full py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden'>
              <div className='w-16 h-16 mt-4 text-blue-600 flex-shrink-0'>
                <FaChalkboardTeacher className='w-full h-full' />
              </div>
              <h3 className='text-lg font-semibold mt-4'>Top Faculty</h3>
              <h4 className='text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden'>Industry leaders from the world's largest companies bring their invaluable insights and experiences as our faculty.</h4>
            </div>
            <div className='USP-card-bg-image max-md:max-w-sm w-full py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden'>
              <div className='w-16 h-16 mt-4 text-blue-600 flex-shrink-0'>
                <MdOutlineRocketLaunch className='w-full h-full' />
              </div>
              <h3 className='text-lg font-semibold mt-4'>360 Degree - Career Launchpad</h3>
              <h4 className='text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden'>Learners will be given 360 Degree support from Accredian throughout the program & after completion.</h4>
            </div>
            <div className='USP-card-bg-image max-md:max-w-sm w-full py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden'>
              <div className='w-16 h-16 mt-4 text-blue-600 flex-shrink-0'>
                <LuClipboardCheck className='w-full h-full' />
              </div>
              <h3 className='text-lg font-semibold mt-4'>Interview Preparation</h3>
              <h4 className='text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden'>Prepare for your interviews with expert guidance, boosting your confidence and readiness for success in your career journey.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default USP