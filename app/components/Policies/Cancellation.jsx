import React, { useEffect } from 'react'

import "./Policy.css"
import HomePageWrapper from '../Wrapper/HomePageWrapper';

const Privacy = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [])

  return (
    <HomePageWrapper>
      <div className='w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular'>
        <div className='max-w-[85rem] w-full py-8'>
          {/* upper section */}
          <h1 className='lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center'>Cancellation Policy</h1>
          <div className='policy-inner w-full py-0 md:py-2 lg:py-8 mt-4'>
            <p>
              At Accredian, we strive to provide a seamless learning experience for all our students. We understand that circumstances may change, and you may need to cancel your enrollment in a program. Please note that this policy applies only to  program fees; application fees are <b>non-refundable.</b>
            </p>
            <h1>Cooling-off Period</h1>
            <p>
              We offer a 7-day cooling-off period from the date of enrollment. During this period,
              you may cancel your enrollment and receive a full refund of the program fees paid, no questions asked.
            </p>
            <h1>How to Cancel</h1>
            <p>
              To initiate a cancellation, please send an email to <a class="c6" href="mailto:admissions@accredian.com">admissions@accredian.com</a>&nbsp;within the cooling-off period. The date of your cancellation request will be considered as the
              date when the email is sent to the provided address.
            </p>
            <h1>Evaluation and Approval</h1>
            <p>
              Cancellation requests submitted within the cooling-off period will be promptly reviewed
              by our team. Approval will be based on the reasons provided for cancellation and any proposed solutions
              offered.
            </p>
            <h1>Refund Process</h1>
            <p>
              Once your cancellation request is approved, refunds will be processed in accordance
              with the Refund Policy.
            </p>
            <h1>Important Notes</h1>
            <ol>
              <li>Non-Transferable Enrollment:&nbsp;Enrollments
                in programs are non-transferable to other individuals or to different programs or batches.</li>
              <li>Post-Cooling-off Period:&nbsp;After the 7-day
                cooling-off period, no cancellations or refunds will be processed, regardless of program start date.</li>
              <li>Policy Changes:&nbsp;Accredian reserves the
                right to alter the cancellation policy at any time. </li>
            </ol>
          </div>
        </div>
      </div>
    </HomePageWrapper>
  )
}

export default Privacy
