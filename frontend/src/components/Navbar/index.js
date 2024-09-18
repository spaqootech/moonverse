import { useState } from "react";
import { Link } from "react-router-dom"
import { FaDiscord, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import logo from '../../img/logo.png'
import ConnectButton from '../ConnectButton';

function Navbar() {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
     if(window.scrollY >= 10){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }
  };
  window.addEventListener('scroll', changeNavbarColor);

  return (
    <nav className={`w-full fixed my-0 top-0 md:px-[15px] ${colorChange && 'bg-black'} h-[130px] md:h-[100px] z-50`}>
      <div className="flex relative flex-wrap">
        <div className="flex w-full md:w-1/3">
          <div className="flex w-full p-[10px] content-center items-center justify-center md:justify-start">
            <div className="flex flex-wrap mb-[-30px] md:mb-0">
              <ConnectButton lb="Let's Start" /> 
              <Link to="/claim-land" className="no-underline text-lg px-[6px] md:px-[12px] lg:px-[24px] md:py-[12px] font-semibold" >
                Claim-Lands
              </Link>
            </div>
          </div>
        </div>


        <div className="flex w-full md:w-1/3">
          <div className="flex w-full p-[10px] content-center items-center">
            <div className="flex justify-center w-full mb-[-30px] md:mb-0">
              <Link to="/">
                <img src={logo} className="max-w-[280px]" alt="logo" />
              </Link>
            </div>
          </div>
        </div>


        <div className="flex w-full md:w-1/3">
          <div className="flex w-full p-[10px] content-center items-center mb-[-30px] md:justify-end justify-center md:mb-0 md:flex-wrap">
            <Link to="/token" className="no-underline text-lg px-[6px] md:px-[24px] lg:px-[36px] md:py-[12px] font-semibold" >
              $MVRS
            </Link>
            <div className="mr-[15px] ml-[10px]">
              <h2 className="text-[#FFFFFF54]">
                {"//"}
              </h2>
            </div>
            <div className="flex justify-center">
              <a className="no-underline text-lg px-[9px] ml-[5px] font-semibold" target="_blank" rel="noreferrer noopener" href="https://discord.gg">
                <FaDiscord />
              </a>
              <a className="no-underline text-lg px-[9px] ml-[5px] font-semibold" target="_blank" rel="noreferrer noopener" href="https://m.facebook.com">
                <FaFacebook />
              </a>
              <a className="no-underline text-lg px-[9px] ml-[5px] font-semibold" target="_blank" rel="noreferrer noopener" href="https://twitter.com">
                <FaTwitter />
              </a>
              <a className="no-underline text-lg px-[9px] ml-[5px] font-semibold" target="_blank" rel="noreferrer noopener" href="https://www.instagram.com">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
