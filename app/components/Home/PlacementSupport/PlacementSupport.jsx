import StepperVertical from "./StepperVertical";

const PlacementSupport = () => {
  return (
    <div className="w-full flex items-center justify-center py-8 px-4 xl:px-12 font-circular">
      <div className="max-w-[85rem] w-full py-2">
        <h4 className="text-base text-darkBlue font-medium max-sm:max-w-[300px]">
          Unified dashboard, guaranteed interview success
        </h4>
        <h1 className="text-3xl md:text-[44px] mt-2 font-medium capitalize">
          Receive expert placement assistance
        </h1>
        <div className="w-full flex py-4 mt-4 md:flex-row flex-col">
          <div className="flex-1">
            <StepperVertical />
          </div>
          <div className="flex-1 md:py-0 py-16 hidden lg:flex justify-center">
            <div className="relative w-full sm:w-[70%] md:w-[45vw] 3xl:w-[42rem]">
              <img
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/laptopscreen.webp"
                alt="placement_laptop"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementSupport;
