import { useEffect, useState } from 'react'
import Strip from '../cta/Strip';
import Navbar from '../Navbar/Navbar';

export default function Navbar3({ userInfo }) {

  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false)
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className='w-full fixed md:sticky top-0 z-20 bg-white transition-all duration-300 font-circular'
        style={{
          transform: `translateY(0)`,
          filter: show ? "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))" : "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
        }}
      >
        <Strip />
        <Navbar />
      </div>
      {/* skeleton */}
      <div className='w-full md:hidden block z-20'
      >
        {/* <Strip user={userInfo} /> */}
        <div
          className="nav-3"
        >
          <div className='nav-3-inner px-4'>
            <div className='nav-3-left'>
              <div className='max-w-[125px] w-full'>
                {/* <img className='w-full' alt='logo' src='https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp' /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
