import { useState } from "react";

const FraudNotificationStrip = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="w-full z-[1300]" role="alert">
      <div className="relative bg-blue-100 text-[#1B66C9] overflow-hidden py-3 px-4 flex items-center">
        <div className="flex animate-marquee">
          <div className="flex items-center gap-2 shrink-0">
            {/* <svg
              className="w-5 h-5 flex-shrink-0 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg> */}
            <span className="text-xs sm:text-sm whitespace-nowrap pr-[3rem]">
              <strong>⚠️ Important: Ignore fraudulent payment requests on WhatsApp or unofficial sources – only trust emails ending with @accredian.com</strong>.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* <svg
              className="w-5 h-5 flex-shrink-0 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg> */}
            <span className="text-xs sm:text-sm whitespace-nowrap pr-[3rem]">
               <strong>⚠️ Important: Ignore fraudulent payment requests on WhatsApp or unofficial sources – only trust emails ending with @accredian.com</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudNotificationStrip;
