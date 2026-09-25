

const Companies = () => {
  return (
    <>
      <div
        id="top companies"
        className="w-full flex justify-center py-12 xl:px-12 px-4"
      >
        <div className="w-full max-w-[85rem]">
          <div className="w-full text-center">
            <h4 className="text-base font-medium">
              Hands-On Learning with Industry Experts
            </h4>
            <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
              Learn from <span className="text-universal">Experts,</span> at the World’s
              <span className="text-universal"> Top </span> Companies
            </h2>
          </div>
          <div className="w-full hidden md:flex justify-center mt-12">
            <img
              className="w-full max-w-7xl"
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/faculty-companies-group.webp"
              alt="companies"
            />
          </div>
          <div className="w-full flex md:hidden justify-center mt-8">
            <img
              className="w-full max-w-7xl"
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/faculty-companies-group-mobile.webp"
              alt="companies-res"
            />
          </div>
        </div>
      </div>
      <p className={`italic p-3 text-center  font-medium`}>
        <span className="font-semibold">*Note:</span> All company logo are
        trademarks or registered trademarks of their respective holders, use of
        them does not imply any affiliation with or endorsement by them.
      </p>
    </>
  );
};

export default Companies;
