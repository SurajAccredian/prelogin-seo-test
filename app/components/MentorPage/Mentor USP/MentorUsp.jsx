
import Image from "next/image";
import "./mentoruspcss.css";
const mentorOverview = {
  unique_points: [
    "Best Industry Pay",
    "Flexible Scheduling",
    "Personal Development",
    "Global Student Engagement",
  ],
};

const MentorUsp = () => {
  return (
    <div
      id="unique points"
      className="USP second-bg-grad w-full flex justify-center py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full ">
          <h4 className="text-base font-medium">
            Benefits of Joining{" "}
            <span className="text-universal"> Our Expert Committee </span>{" "}
          </h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold">
            Contribute to <span className="text-universal">
              Transformative Education</span>
          </h2>
        </div>
        <div className="flex justify-center mt-12">
          <div className="w-full max-w-[75rem] grid grid-cols-2 xl:grid-cols-4 md:place-items-center gap-4 md:gap-8">
            {mentorOverview.unique_points.includes("Best Industry Pay") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-16 h-16 mt-4 text-blue-600 flex-shrink-0">
                  <Image src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/pay.svg" alt="Best industry pay" width={64} height={64} quality={75} className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold mt-4">
                  Best Industry Pay
                </h3>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Competitive compensation for your valuable time and expertise.
                </h4>
              </div>
            )}
            {mentorOverview.unique_points.includes("Flexible Scheduling") && (
              <div className="USP-card-bg-image w-full  py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-16 h-16 mt-4 text-blue-600 flex-shrink-0">
                  <Image src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/calendarImg.svg" alt="Flexible scheduling" width={64} height={64} quality={75} className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold mt-4">
                  Flexible Scheduling
                </h3>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Choose hours that fit your lifestyle.
                </h4>
              </div>
            )}
            {mentorOverview.unique_points.includes("Personal Development") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-16 h-16 mt-4 text-blue-600 flex-shrink-0">
                  <Image src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/docImage.svg" alt="Impactful work" width={64} height={64} quality={75} className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold mt-4">
                  Impactful Work
                </h3>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Make a real difference in students' lives and careers.
                </h4>
              </div>
            )}
            {mentorOverview.unique_points.includes(
              "Global Student Engagement"
            ) && (
                <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                  <div className="w-16 h-16 mt-4 text-blue-600 flex-shrink-0">
                    <Image src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/meeting.svg" className="w-full h-full" alt="Global student engagement" width={64} height={64} quality={75} />
                  </div>
                  <h3 className="text-lg font-semibold mt-4">
                    Global Student Engagement

                  </h3>
                  <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                    Teach a diverse group of students globally, expand your influence.
                  </h4>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorUsp;
