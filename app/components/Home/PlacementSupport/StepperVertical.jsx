export default function StepperVertical() {
  return (
    <div className="flex flex-col">
      <div className="w-12 md:w-16 flex justify-center">
        <div className="w-[1px] h-10 md:h-12 bg-slate-500" />
      </div>
      {/* first component */}
      <div className="flex gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg border border-universal p-4">
            <img
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/ps1.webp"
              alt="career launchpad"
            />
          </div>
          <div className="w-[1px] h-full min-h-10 md:min-h-16 bg-slate-500" />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xl md:text-2xl">
            360 Degree - Career Launchpad
          </h3>
          <h4 className="max-w-lg lg:max-w-md text-sm md:text-base leading-tight mt-3 text-neutral-700 ">
            Get a 360 degree career transformation with resume preparation,
            GitHub & Linkedin profile builders.
          </h4>
        </div>
      </div>
      {/* second component */}
      <div className="flex gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg border border-universal p-4">
            <img
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/ps2.webp"
              alt="Interview preparation"
            />
          </div>
          <div className="w-[1px] h-full min-h-10 md:min-h-16 bg-slate-500" />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xl md:text-2xl">
            Interview Preparation
          </h3>
          <h4 className="max-w-lg lg:max-w-md text-sm md:text-base leading-tight mt-3 text-neutral-700 ">
            Apply to recommended jobs based on your profile and crack any
            interview with our Top 100 Interview Questions guide. Don't worry,
            we'll also provide mock interviews.
          </h4>
        </div>
      </div>
      {/* third component */}
      <div className="flex gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg border border-universal p-4">
            <img
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/ps3.webp"
              alt="Mentor session"
            />
          </div>
          <div className="w-[1px] h-full bg-slate-500" />
        </div>
        <div className="mb-2">
          <h3 className="font-semibold text-xl md:text-2xl">
            Experience 1-on-1 mentor sessions
          </h3>
          <h4 className="max-w-lg lg:max-w-md text-sm md:text-base leading-tight mt-3 text-neutral-700 ">
            Global Data Leader talks help you gain practical insights into
            industry requirements, current trends, and opportunities.
          </h4>
        </div>
      </div>
    </div>
  );
}
