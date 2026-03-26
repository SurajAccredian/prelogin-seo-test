import React, { useEffect } from 'react'

import "./Policy.css"
import Wrapper from '../Wrapper/HomePageWrapper';

const CookiePolicy = () => {

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
                    <h1 className='lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center'>Accredian's Cookie Policy</h1>
                    <div className='policy-inner w-full py-0 md:py-2 lg:py-8 mt-4'>

                        <p><strong>Last updated:</strong> February 5, 2026</p>

                        <p>This Cookie Policy explains how Accredian uses cookies and similar technologies when you visit our website.</p>

                        <h1>What are cookies?</h1>
                        <p>Cookies are small text files stored on your device when you visit a website. They help the site function properly and provide information about how users interact with it.</p>

                        <h1>How we use cookies</h1>
                        <p>We use cookies to:</p>
                        <ol>
                            <li>Ensure the website functions correctly</li>
                            <li>Improve user experience</li>
                            <li>Analyse website traffic and performance</li>
                            <li>Personalise content where applicable</li>
                        </ol>

                        <h1>Types of cookies we use</h1>
                        <h1>1. Essential Cookies</h1>
                        <p>These are required for core website functionality such as security, accessibility, and page navigation.</p>

                        <h1>2. Analytics Cookies</h1>
                        <p>These help us understand how users interact with our website so we can improve our services.</p>

                        <h1>Your choices</h1>
                        <p>You can choose to accept or reject non-essential cookies through the cookie banner or by updating your preferences at any time.</p>

                        <h1>Data protection & privacy</h1>
                        <p>Any personal data collected through cookies is processed in accordance with applicable data protection laws in India, including the Digital Personal Data Protection Act, 2023. For more details, please refer to our Privacy Policy.</p>

                        <h1>Updates to this policy</h1>
                        <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page.</p>

                        <h1>Contact us</h1>
                        <p>If you have questions about our use of cookies, please contact us at: 📧 <a href="mailto:info@accredian.com">info@accredian.com</a></p>

                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default CookiePolicy
