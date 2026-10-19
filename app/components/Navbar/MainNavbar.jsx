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
      <div id="site-header" className='w-full fixed md:sticky top-0 z-20 bg-white transition-all duration-300 font-circular'
        style={{
          transform: `translateY(0)`,
          filter: show ? "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))" : "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
        }}
      >
        <Strip />
        <Navbar />
      </div>
      {/* skeleton for mobile fixed header document-flow spacing */}
      <div className='w-full md:hidden block pointer-events-none invisible' aria-hidden="true">
        {/* <Strip user={userInfo} /> */}
        <div className="nav-3 flex flex-col items-center justify-center py-[0.6rem] w-full px-4">
          <div className="nav-3-inner min-h-[60px]" />
          <div className="w-full pt-2 pb-1 h-[48px]" />
        </div>
      </div>
    </>
  )
}
