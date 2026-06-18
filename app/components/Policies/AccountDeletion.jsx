"use client";

import React, { useEffect } from 'react'

import "./Policy.css"
import HomePageWrapper from '../Wrapper/HomePageWrapper';

const AccountDeletion = () => {

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
          <h1 className='lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center'>Account Deletion Policy</h1>
          <div className='policy-inner w-full py-0 md:py-2 lg:py-8 mt-4'>
            <p>
              To request deletion of your Accredian account, email <a href="mailto:academics@accredian.com">academics@accredian.com</a> from your registered email address.
            </p>
            <h1>Data deleted:</h1>
            <ol>
              <li>Profile information</li>
              <li>Learning progress</li>
              <li>Event registrations</li>
            </ol>
            <h1>Data retained:</h1>
            <ol>
              <li>Financial and invoice records as required by law</li>
            </ol>
            <h1>Processing Time</h1>
            <p>
              Requests are processed within 30 days.
            </p>
          </div>
        </div>
      </div>
    </HomePageWrapper>
  )
}

export default AccountDeletion
