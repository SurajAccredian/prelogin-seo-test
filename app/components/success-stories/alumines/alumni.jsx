import React from 'react'
import Image from 'next/image'

const Alumni = ({ alumni }) => {
  return (
    <div className='w-full lg:max-w-[400px] min-h-[420px] rounded-2xl overflow-hidden bg-white border flex flex-col relative p-2'>
      <div className="w-full min-h-32 h-36 flex items-center justify-center bg-blue-50 rounded-xl overflow-hidden relative">
        {alumni?.alumni_image && (
          <Image
            className="w-full h-full object-contain"
            src={alumni.alumni_image}
            alt={alumni?.name || "Alumni"}
            width={380}
            height={144}
            quality={75}
            sizes="380px"
          />
        )}
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <div className='min-h-20'>
          <p className='font-semibold text-center text-sm max-w-[300px]'>{alumni.review}</p>
        </div>
        <div className='min-h-20 text-center'>
          <h3 className='text-lg font-semibold mt-4'>{alumni.name}</h3>
          <h2 className='text-base font-medium'>{alumni.designation}</h2>
        </div>
        <div className='min-h-20 max-w-[160px] mt-2 flex items-center justify-center'>
          {alumni?.company_logo && (
            <Image
              className='w-full h-auto object-contain'
              src={alumni.company_logo}
              alt={alumni?.name ? `${alumni.name}'s company` : "Company logo"}
              width={160}
              height={60}
              quality={75}
              sizes="160px"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Alumni