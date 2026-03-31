
const CTAThankYou = () => {
  return (
    <div className="min-h-screen w-full bg-[#16151F] py-12 px-4 xl:px-12">
      <div className="max-w-[85rem] w-full mx-auto flex flex-col gap-4 items-center">
        <div className="w-36 flex-shrink-0">
          <img
            className="w-full"
            // src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/faculty_portal_accredian_cropped_logo.webp"
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-white-logo.png"
            alt="logo"
          />
        </div>
        <div className="max-w-4xl w-full px-6 py-16 flex flex-col items-center mt-20 bg-[#252736]">
          <h1 className="text-white text-3xl font-bold text-center">Thank you! You're all set.</h1>
          <div className="w-full max-w-2xl border-b my-12 border-neutral-500/20" />
          <div className="max-w-2xl mx-auto">
            <h4 className="text-[#9095B0] text-base md:text-lg text-center">Our career advisor will be reaching out to you shortly to guide you in choosing the right program that suits your career goals. In the meantime, feel free to explore more about our flagship programs and discover how it can help accelerate your career growth.</h4>
          </div>
          <a href="/">
            <button className="rounded-md mt-12 px-8 py-4 text-base md:text-lg font-semibold bg-[rgb(1,119,252)] hover:bg-darkBlue text-white">Back To Accredian Homepage</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CTAThankYou;