import Image from "next/image";

const Companies = () => {
  return (
    <div
      id="top companies"
      className="w-full flex justify-center py-12 xl:px-12 px-4 font-circular"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full text-center">
          <h4 className="text-base font-medium">A Track Record of Success</h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Our <span className="text-universal">Students</span> Thrive in{" "}
            <span className="text-universal">Top-tier</span> Professions
          </h2>
        </div>
        <div className="w-full flex justify-center mt-12">
          <Image
            className="w-full max-w-4xl h-auto object-contain"
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/companies-logo-success-stories.svg"
            alt="companies"
            width={896}
            height={300}
            quality={75}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </div>
    </div>
  );
};

export default Companies;
