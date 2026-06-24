"use client";
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
      <div className='w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular policy-page-container'>
        <div className='max-w-[85rem] w-full py-8'>
          {/* upper section */}
          <h1 className='lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center'>Accredian's Privacy Policy</h1>
          <div className='policy-inner w-full py-0 md:py-2 lg:py-8 mt-4'>
            <h2>What do we do with your information?</h2>
            <p>When you enroll in our program, as part of the registration process, we collect the personal information you provide us, including your name, address, and email address. When you browse our store, we also automatically receive your computer’s internet protocol (IP) address, which helps us gather information about your browser and operating system.</p>
            <p>Email Marketing (if applicable): With your permission, we may send you emails about our store, new products, and other updates.</p>
            <h2>How do we use personal data?</h2>
            <p>We use personal information to fulfill the services you request. If we use your information, including personal details, to market our services to you, we will give you the option to opt out of such communications.</p>
            <ol>
              <li>Resolve disputes.</li>
              <li>Troubleshoot problems.</li>
              <li>Promote our services.</li>
              <li>Collect owed fees.</li>
              <li>Tailor our services to your interests.</li>
              <li>Inform you about online offers, products, services, and updates.</li>
              <li>Personalize your experience.</li>
              <li>Safeguard against errors, fraud, and other criminal activities.</li>
              <li>Enforce our terms and conditions.</li>
              <li>Conduct research and analysis to enhance the customer experience.</li>
              <li>Perform periodic audits.</li>
              <li>Contact you for important information or notices, as described to you at the time of collection.</li>
              <li>As our customers, we may send you product updates via email, SMS, call, or WhatsApp.</li>
            </ol>
            <h2>CONSENT</h2>
            <strong>How do we obtain your consent?</strong>
            <p>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery, or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason, such as marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to decline.</p>
            <strong>How do you withdraw your consent?</strong>
            <p>If, after you opt-in, you change your mind, you may withdraw your consent for us to contact you or for the continued collection, use, or disclosure of your information, at any time, by emailing us at <strong>info@accredian.com</strong> or by contacting us at Accredian, 250, Nimble CoWork, Udyog Vihar Phase IV, Gurgaon – 122015.</p>
            <h2>DISCLOSURE</h2>
            <p>We commit not to disclose your personal information unless mandated by applicable law or compelled by a breach of our Terms of Service.</p>
            <h2>PAYMENT</h2>
            <p>We utilize Razorpay for processing payments. Razorpay does not store your card data on its servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payments. Your purchase transaction data is utilized only for as long as necessary to complete your purchase transaction. Once the transaction is completed, your purchase information is not retained. Our payment gateway complies with the standards established by PCI-DSS, as managed by the PCI Security Standards Council, a collaborative effort of brands such as Visa, MasterCard, American Express, and Discover.</p>
            <p>For further insight, you may also wish to review the <a rel='noreferrer' target='_blank' href="https://razorpay.com/">terms and conditions</a> of Razorpay.</p>
            <h2>THIRD-PARTY SERVICES</h2>
            <p>In general, the third-party providers employed by our organization will collect, use, and disclose your information solely to the extent necessary to facilitate the services they provide to us. However, specific third-party service providers, such as payment gateways and other payment transaction processors, maintain their own privacy policies governing the information required for your purchase-related transactions. We recommend that you carefully review the privacy policies of these providers to understand how they handle your personal information.</p>
            <p>Please be advised that certain providers may operate from or have facilities situated within jurisdictions distinct from your or our own. Should you opt to proceed with a transaction involving the services of a third-party provider, your information may consequently be subjected to the laws of the jurisdiction(s) in which said provider or its facilities are located. Upon leaving our store's website or being redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our Terms of Service.</p>
            <h2>Links</h2>
            <p>Clicking on links on our store may redirect you away from our site. We bear no responsibility for the privacy practices of other sites and encourage you to review their privacy statements.</p>
            <h2>SECURITY</h2>
            <p>To ensure the protection of your personal information, we implement reasonable precautions and adhere to industry best practices to prevent its unauthorized loss, misuse, access, disclosure, alteration, or destruction.</p>
            <h2>COOKIES</h2>
            <p>We employ cookies to maintain the continuity of your user session. It should be noted that these cookies are not employed for the purpose of personally identifying you on other websites.</p>
            <h2>AGE OF CONSENT</h2>
            <p>By accessing this site, you declare that you are of legal age in your state or province of residence. Alternatively, you confirm that you have reached the age of majority in your state or province of residence and have authorized us to permit your minor dependents to use this site.</p>
            <h2>CHANGES TO THIS PRIVACY POLICY</h2>
            <p>We reserve the right to modify this privacy policy at our discretion, and we recommend that you review it periodically for any updates. Changes will take effect immediately upon posting on the site. In the event of substantial modifications, we will provide notice of the update here, ensuring clarity regarding the data we collect, its usage, and potential disclosure circumstances. In the event of an acquisition or merger involving our business, your information may be transferred to the new owners to facilitate the continuation of product offerings to you.</p>
            <h2>QUESTIONS AND CONTACT INFORMATION</h2>
            <p>Should you desire to access, correct, adjust, or remove any personal information in our possession, wish to lodge a complaint, or require further details, kindly reach out to our Privacy Compliance Officer via email at <strong>info@accredian.com</strong> or by postal service at Accredian, 250, Nimble CoWork, Udyog Vihar Phase IV, Gurgaon – 122015.</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Privacy
