import React, { useEffect } from 'react'

import "./Policy.css"
import Wrapper from '../Wrapper/HomePageWrapper';

const Privacy = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [])

  return (
    <Wrapper>
      <div className='w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular'>
        <div className='max-w-[85rem] w-full py-8'>
          {/* upper section */}
          <h1 className='lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center'>Refund Policy</h1>
          <div className='policy-inner w-full py-0 md:py-2 lg:py-4 mt-4'>
            <p>Our commitment is to ensure that students have a positive and fulfilling experience with our programs. We understand that circumstances may change, and students may need to reconsider their enrollment. To accommodate this, we have established a clear refund policy, which includes a 7-day cooling-off period. Please note that this policy applies only to program fees; application fees are <b>non-refundable.</b>
            </p>
            <p>
              Please read the details below to understand the process and conditions for requesting a refund.</p>
            <h1>Cooling-off Period</h1>
            <p>One notable feature of the programs is the 7-day cooling-off period, which begins from
              the day of payment of the full fee or the first installment, allowing students to reassess the suitability of the
              program according to their career goals and vision. Students can raise a refund request within this cooling-off
              period. Any requests received within this window will be considered for further evaluation.</p>
            <h1>Evaluation Process</h1>
            <p>Refund requests submitted within the cooling-off period will be forwarded to the
              institute&rsquo;s team for final approval. Approval will be based on the proposed solution offered by the
              institute to address the reasons provided for raising the refund request.</p>
            <h1>Approval Timeframe</h1>
            <p>The final approval process may take approximately 14-15 days from the date the refund
              request is raised. Students are kindly requested to exercise patience during this period as the institute
              carefully evaluates their requests.</p>
            <h1>Request Submission</h1>
            <p>To initiate a refund request, students should send an email to
              admissions@accredian.com. The date of the request will be considered as the date when the email is sent to the
              provided address.</p>
            <h1>Processing and Notification</h1>
            <ol>
              <li>Processing Time:&nbsp;Once approved, the
                refund process may take up to 7-10 business days, depending on the payment gateway and bank procedures.
              </li>
              <li>Notification:&nbsp;Students will receive a
                confirmation email once the refund has been initiated.</li>
            </ol>
            <h1>Mode of Refund</h1>
            <p>Refunds will be sent according to the mode of payment chosen by the students. For
              example, if the fees were paid via UPI, the refund will be initiated via UPI. However, this may vary on a
              case-by-case basis.</p>
            <h1>Important Considerations</h1>
            <ol>
              <li>It is the sole responsibility of the student enrolling in a Program
                to verify the accuracy and evaluate the suitability and relevance of the enrolled Program. Transfer of
                enrollment to other programs or batches is NOT possible.</li>
              <li>If a student chooses to upgrade to another program where the already
                paid fee is adjusted in the upgraded program fee, they will not be eligible for either a refund or a cooling-off
                period, as upgrading to another program is solely at the student&#39;s discretion.</li>
              <li>After the 7-day cooling-off period, no refunds will be processed
                regardless of whether the program has started or not.</li>
              <li>In exceptional cases where admissions are approved beyond the standard policy, the conditions outlined in this refund policy shall not apply, and no refund will be provided under any circumstances.</li>
            </ol>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Privacy
