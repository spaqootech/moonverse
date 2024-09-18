import { Link } from "react-router-dom"
import { FaDiscord, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import logo from '../../img/logo.png'


function Footer() {
  return (
    <div className="w-full text-white">
      <div className="w-full">
        <div className="flex flex-wrap mx-auto max-w-[1140px]">
          <div className="flex w-full md:w-1/2">
            <div className="flex flex-wrap w-full p-[10px] content-center items-center justify-center md:justify-start">
              <div className="w-full mb-[10px] md:w-auto md:mb-0">
                <p
                  className="no-underline text-gray-200 font-medium text-center"
                >
                  Info
                </p>
              </div>
              <div className="hidden md:block mx-[20px]">
                <h2 className="text-[#FFFFFF54]">
                  {"//"}
                </h2>
              </div>
              <div>
                <ul className="flex flex-wrap mx-[-8px]">
                  <li className="flex mx-[8px]">
                    <Link
                      to="/moon"
                      className="no-underline font-medium"
                    >
                      Moon
                    </Link>
                  </li>
                  <li className="flex mx-[8px]">
                    <Link
                      to="/"
                      className="no-underline font-medium"
                    >
                      Astronauts
                    </Link>
                  </li>
                  <li className="flex mx-[8px]">
                    <Link
                      to="/token"
                      className="no-underline font-medium"
                    >
                      Token
                    </Link>
                  </li>
                  <li className="flex mx-[8px]">
                    <Link
                      to="/roadmap"
                      className="no-underline font-medium"
                    >
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex w-full md:w-1/2">
            <div className="flex flex-wrap w-full p-[10px] content-center items-center justify-center md:justify-end">
              <Link to="/">
                <img src={logo} className="max-w-[250px]" alt="logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>

        
      <div className="w-full pb-[30px]">
        <div className="flex flex-wrap mx-auto max-w-[1140px]">
          <div className="flex w-full md:w-1/2">
            <div className="flex flex-wrap w-full p-[10px] content-center items-center justify-center md:justify-start">
              <div className="flex">
                <a className="no-underline px-[9px] ml-[5px] font-medium" target="_blank" rel="noreferrer noopener" href="https://discord.gg/">
                  <FaDiscord />
                </a>
                <a className="no-underline px-[9px] ml-[5px] font-medium" target="_blank" rel="noreferrer noopener" href="https://m.facebook.com//">
                  <FaFacebook />
                </a>
                <a className="no-underline px-[9px] ml-[5px] font-medium" target="_blank" rel="noreferrer noopener" href="https://twitter.com/">
                  <FaTwitter />
                </a>
                <a className="no-underline px-[9px] ml-[5px] font-medium" target="_blank" rel="noreferrer noopener" href="https://www.instagram.com//">
                  <FaInstagram />
                </a>
              </div>
              <div className="hidden md:block mx-[20px]">
                <h2 className="text-[#FFFFFF54]">
                  {"//"}
                </h2>
              </div>
              <div className="flex justify-center">
                <a
                  href="mailto:astro@moonverse.space"
                  className="no-underline px-6 font-medium text-[#00F0FF]"
                >
                  astro@moonverse.space
                </a>
              </div>
            </div>
          </div>

          <div className="flex w-full md:w-1/2">
            <div className="flex flex-wrap w-full p-[10px] content-center items-center justify-center md:justify-end">
              <div className="text-center md:text-right">
                <p className="text-[#808080]">
                  © Copyright 2024 Moonverse. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
