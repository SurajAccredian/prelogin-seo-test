import React from 'react'

import "./Policy.css"
import { useEffect } from 'react'
import Wrapper from '../Wrapper/HomePageWrapper'

const Terms = () => {

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
          <h1 className='lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center'>Terms of Service</h1>
          <div className='policy-inner w-full py-0 md:py-2 lg:py-4 mt-4'>
            <h1>Overview</h1>
            <p>This website is managed and operated by FULLSTACK EDUCATION. Throughout the entirety of this website, the terms "we," "us," and "our" are utilized to refer to FULLSTACK EDUCATION. FULLSTACK EDUCATION provides this website, encompassing all information, tools, and services available herein, to you, the user. Your use of this site is contingent upon your acceptance of all terms, conditions, policies, and notices outlined herein.</p>
            <p>By accessing or conducting a purchase on our website, you hereby engage with our "Service" and consent to be legally bound by the subsequent terms and conditions ("Terms of Service," "Terms"), inclusive of any supplementary terms, conditions, and policies cited herein or accessible via hyperlink. These Terms of Service are applicable to all site users, including but not limited to browsers, vendors, customers, merchants, and content contributors.</p>
            <p>Kindly review these Terms of Service meticulously prior to accessing or utilizing our website. By accessing or engaging with any portion of the site, you consent to adhere to these Terms of Service. Should you find any term or condition of this agreement unacceptable, you are consequently not permitted to access the website or avail of any services. Furthermore, if these Terms of Service are to be regarded as an offer, acceptance is explicitly confined to these Terms of Service.</p>
            <p>Any new features or tools integrated into the current platform are also subject to the Terms of Service. The most recent version of these Terms of Service is available for review on this page at any time. We retain the right to amend, modify, or replace any portion of these Terms of Service by posting updates or alterations on our website. It is recommended that you periodically review this page for any updates or changes. Your continued use of or access to the website following the posting of any modifications indicates your acceptance of those changes.</p>
            <h1>Authorized Use of Products and Services</h1>
            <p>By agreeing to these Terms of Service, you affirm that you are either of the legal age of majority in your state or province of residence, or that you have reached the legal age of majority and have provided consent for any of your minor dependents to use this site. You may not utilize our products for any unlawful or unauthorized purpose, nor may you, in using the Service, contravene any laws in your jurisdiction (including, but not limited to, copyright laws).</p>
            <p>You must not transmit any worms, viruses, or any form of malicious code that could constitute a cyber attack or cause destructive harm to the website or its users. Any breach or violation of these Terms will lead to an immediate termination of your Services.</p>
            <h1>General Conditions</h1>
            <p>We reserve the right to refuse service to anyone for any reason at any time. You acknowledge that your content (excluding payment information) may be transferred unencrypted and involve: transmissions over various networks; and alterations to conform and adapt to the technical requirements of connecting networks or devices. Payment information is always encrypted during transfer over networks.</p>
            <p>You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service, or any contact on the website through which the service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>
            <h1>Information Accuracy and Relevance</h1>
            <p>Please be aware that we cannot guarantee the precision, completeness, or currentness of the information available on this website. The material provided herein is intended solely for general informational purposes and should not serve as the exclusive basis for making significant decisions without consultation of primary, more accurate, more complete, or more timely sources of information.</p>
            <p>We kindly remind you that any reliance on the material on this website is at your own discretion and risk. This website may include historical information, which is inherently not up-to-date and is provided for your reference only. We reserve the right to modify the content of this site at any given time, though we are under no obligation to update any information. We encourage you to monitor changes to our site proactively.</p>
            <h1>Modifications to the Service and Prices</h1>
            <p>Please note that the prices for our products are subject to change without prior notice. At our discretion, we reserve the right to modify or discontinue the Service (or any part thereof) at any time without prior notification. We shall not be liable for any modification, price change, suspension, or discontinuance of the Service to you or any third party. Your understanding and cooperation in this matter are greatly appreciated.</p>
            <h1>Product Availability and Description</h1>
            <p>We offer certain products or services exclusively online through our website. These items may be available in limited quantities and are eligible for return or exchange solely according to our Return Policy.</p>
            <p>While we strive to accurately represent the colors and images of our products on our website, we cannot assure that the display of any color on your computer monitor will be precise.</p>
            <p>We reserve the right, without obligation, to restrict sales of our products or Services to any individual, geographic area, or jurisdiction, which we may decide on a case-by-case basis. Additionally, we retain the authority to limit the quantities of any products or services we provide. Product descriptions and prices are subject to change at any moment without prior notification, at our exclusive discretion. We also reserve the right to discontinue any product at any time. Offers for any product or service made on this site are null and void where prohibited.</p>
            <p>We do not guarantee that the quality of any products, services, information, or other material purchased or acquired by you will match your expectations, nor do we promise that any errors in the Service will be corrected.</p>
            <h1>Order Limitations and Cancellations</h1>
            <p>We reserve the right to decline any order you place with us. We may, at our discretion, limit or cancel quantities purchased per individual, per household, or per order. These limitations may apply to orders made under the same customer account, credit card, and/or billing and shipping address. If we modify or cancel an order, we may attempt to notify you by reaching out to the email address, billing address, or phone number provided at the time the order was placed. We also reserve the right to restrict or prohibit orders that, in our judgment, seem to be placed by dealers, resellers, or distributors.</p>
            <p>You acknowledge and agree to furnish current, comprehensive, and precise purchase and account details for all transactions conducted at our establishment. Furthermore, you commit to promptly updating your account and related information, including email addresses, payment card numbers, and expiration dates, to facilitate the completion of transactions and necessary communication.</p>
            <p>For further details, kindly refer to our <a href="/policies/accredian-policy">Returns Policy</a>.</p>
            <h1>Optional Tools</h1>
            <p>We may provide you access to third-party tools over which we neither monitor nor exert any control or input.</p>
            <p>You acknowledge and agree that we grant access to such tools "as is" and "as available," without warranties, representations, or conditions of any kind and without endorsement. We shall bear no liability whatsoever arising from or related to your use of optional third-party tools.</p>
            <p>Any use by you of optional tools offered through the site is entirely at your own risk and discretion. You should ensure that you are familiar with and approve of the terms under which tools are provided by the relevant third-party provider(s).</p>
            <p>Furthermore, we may, in the future, offer new services and/or features through the website (including the release of new tools and resources). Such new features and/or services will also be subject to these Terms of Service.</p>
            <h1>Third-Party Links and Content</h1>
            <p>Our Service may feature content, products, and services that include materials from third parties.</p>
            <p>Links on our site may lead you to third-party websites not affiliated with us. We do not assume responsibility for scrutinizing or evaluating their content's accuracy. Furthermore, we make no guarantees and shall not bear any liability or responsibility for any materials, websites, products, or services provided by third parties.</p>
            <p>We shall not be held accountable for any damages or harm resulting from the purchase or use of goods, services, resources, or content, or from any transactions conducted with third-party websites. We advise you to thoroughly review the policies and practices of these third parties to ensure you understand them before proceeding with any transaction. Should you have any complaints, claims, concerns, or questions regarding third-party products, these inquiries should be directed to the third-party in question.</p>
            <h1>User Submissions</h1>
            <p>Should you provide us with specific submissions at our request (e.g., contest entries), or if you voluntarily share creative ideas, suggestions, proposals, plans, or other materials, whether online, via email, postal mail, or otherwise (collectively referred to as "comments"), you consent to our unrestricted right to edit, copy, publish, distribute, translate, and otherwise utilize in any medium any comments forwarded to us, at any time and without limitation.</p>
            <p>We are not obligated:</p>
            <ol>
              <li>To maintain any comments in confidence;</li>
              <li>To provide compensation for any comments; or</li>
              <li>To respond to any comments.</li>
            </ol>
            <p>While we retain the discretion to monitor, edit, or remove content deemed unlawful, offensive, threatening, defamatory, pornographic, obscene, or otherwise objectionable, or that violates any party's intellectual property rights or these Terms of Service, we are under no obligation to do so.</p>
            <p>You agree that your comments will not infringe upon any third-party rights, including copyright, trademark, privacy, personality, or other personal or proprietary rights.</p>
            <p>Furthermore, your comments must not contain defamatory or otherwise unlawful, abusive, or obscene material, nor should they include any computer viruses or malware that could disrupt the operation of the Service or any associated website. You must not use a false email address, impersonate another individual, or mislead us or third parties regarding the origin of any comments. You bear sole responsibility for the accuracy of any comments you make. We assume no liability for any comments posted by you or any third party.</p>
            <h1>Personal Information</h1>
            <p>Any personal information you submit through the store is subject to our <a href="/terms/privacy">Privacy Policy</a>.</p>
            <h1>Errors, Inaccuracies, and Omissions</h1>
            <p>Occasionally, there may be information on our site or in the Service that contains typographical errors, inaccuracies, or omissions related to product descriptions, pricing, promotions, offers, product shipping charges, transit times, and availability. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</p>
            <p>We undertake no obligation to update, amend, or clarify information in the Service or on any related website, including, without limitation, pricing information, except as required by law.</p>
            <h1>Prohibited Uses</h1>
            <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:</p>
            <ol>
              <li>For any unlawful purpose.</li>
              <li>To solicit others to perform or participate in any unlawful acts.</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
              <li>...</li>
            </ol>
            <p>We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>
            <h1>Disclaimer of Warranties; Limitation of Liability</h1>
            <p>We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free.</p>
            <p>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</p>
            <p>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</p>
            <p>You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties, or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</p>
            <p>In no case shall FULLSTACK EDUCATION, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability, or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</p>
            <h1>Indemnification</h1>
            <p>You agree to indemnify, defend, and hold harmless FULLSTACK EDUCATION and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees from any claim or demand, including reasonable attorneys’ fees, made by any third party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third party.</p>
            <h1>Severability</h1>
            <p>In the event that any provision of these Terms of Service is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service. Such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
            <p>Our failure to exercise or enforce any right or provision of these Terms of Service does not constitute a waiver of such right or provision.</p>
            <p>These Terms of Service, along with any policies or operating rules posted by us on this site or related to the Service, establish the complete agreement and understanding between you and us, governing your use of the Service. They override any previous or concurrent agreements, communications, and proposals, whether oral or written, between you and us (including, but not limited to, any previous versions of the Terms of Service).</p>
            <p>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>
            <h1>Governing Law</h1>
            <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India and the jurisdiction of Jaipur, Rajasthan.</p>
            <h1>Changes to Terms of Service</h1>
            <p>You can review the most current version of the Terms of Service at any time on this page.</p>
            <p>We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>
            <h1>Contact Information</h1>
            <p>Questions about the Terms of Service should be sent to us at info@accredian.com.</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Terms
