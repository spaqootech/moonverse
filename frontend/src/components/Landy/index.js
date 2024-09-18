import React, { useState, useContext, useEffect } from "react";
import Icon1 from "../../img/moon-4th.png";
import Icon2 from "../../img/ast.png";
import ArrowDown from "../../img/arrow-down.png";
import ArrowUp from "../../img/arrow-up.png";
import Loader from "../Loader"
import { allowanceLand, approveLand, checkApporve } from "../../utils/weth";
import { mint as landplotMint } from "../../utils/landplot";
import { mint as astronautMint } from "../../utils/astronaut";
import { SuccessNotifier, FailedNotifier, WarningNotifier } from "../../utils/notifier"
import { AppContext } from "../../context";

function Landy() {
  const [ landplotAmount, setLandplotAmount ] = useState(1);
  const [ astronautAmount, setAstronautAmount ] = useState(1);
  // const [ loading, setLoading ] = useState(true);
  const [ needApproveLandplot, setNeedApproveLandplot ] = useState(false);
  const [ needApproveAstronaut, setNeedApproveAstronaut ] = useState(false);
  const { walletAddress } = useContext(AppContext)

  useEffect(()=>{
    const fn = async() => {
      // setLoading(true);
      let allowed = await allowanceLand(walletAddress);
      let need = checkApporve(allowed);
      if ( need.landplot ) setNeedApproveLandplot(true);
      else setNeedApproveLandplot(false);

      if ( need.astronaut ) setNeedApproveAstronaut(true);
      else setNeedApproveAstronaut(false);
      // setLoading(false)
    }

    if ( walletAddress ) {
      fn();
    }
  }, [walletAddress])

  const onApprove = async (isLandplot) => {
    try {
      if (!walletAddress) {
        WarningNotifier("Please connect metamask.");
        return;
      }

      // setLoading(true);
      
      let tx = await approveLand(isLandplot);
      console.log(tx, tx.hash);
      let result = await tx.wait();
      if ( result.status === 0 ) {
        FailedNotifier("Approvement failed. Check transaction.");
      } else {
        // setLoading(false);
        isLandplot? setNeedApproveLandplot(false):setNeedApproveAstronaut(false);
        SuccessNotifier("Approvement Success. You can mint for now.");
      }
    } catch (error) {
      console.log(error);
      // setLoading(false);
      FailedNotifier("Failed.");
    }
  }
  const onMint = async (isLandplot) => {
    try {
      if (!walletAddress) {
        WarningNotifier("Please connect metamask.");
        return;
      }

      // setLoading(true);
      let amount = isLandplot? landplotAmount:astronautAmount;
      let tx;
      if ( isLandplot ) tx = await landplotMint(amount);
      else tx = await astronautMint(amount);

      console.log(tx.hash);
      let result = await tx.wait();
      if ( result.status === 0 ) {
        // setLoading(false);
        FailedNotifier("Mint failed. Check transaction.");
      } else {
        // setLoading(false);
        SuccessNotifier("Mint Success");
      }
    } catch (error) {
      let msg = error.data? error.data.message:error.message;
      // setLoading(false);
      console.log(error);
      FailedNotifier(msg);
    }
  }

  return (
    <div id="Landy" className="w-full pt-[130px] min-h-[80vh] md:pt-[100px]">
      <div className="flex flex-wrap justify-center items-center mx-auto">
        <div className="flex flex-col self-end min-h-[1px] w-full h-full pb-[40px] md:w-1/3">
          <div className="">
            <img src={Icon1} alt="og-left" />
          </div>
          <div id="text-shadow-description" className="font-bold text-center text-white text-[20px] text-white mt-[-100px]">
            <div className=" fontFamily:'Obitron' font-black text-[42px]">
              <span id="text-shadow-mint">MINT NOW FOR</span>
              <br />
              <span id="text-shadow-mint">ONLY</span>
              <span className="text-[#EFA20C]"> .1 ETH</span>
            </div>
          </div>
          { /*!loading &&*/ ( needApproveLandplot?
              <div className="flex justify-center py-4 fontFamily:'Obitron' text-[42px]">
                <button className="bg-[#00F0FF] rounded-[2px] px-4 ml-4 font-black"
                    onClick={()=>onApprove(true)}
                  >
                    Approve
                </button>
              </div>
              :
              <div className="flex justify-center py-4 fontFamily:'Obitron' text-[42px]">
                <div className="flex justify-center items-center border-2 border-[#00F0FF] rounded-[2px]">
                  <div className="text-[#00F0FF] mx-4 w-8 ">{landplotAmount}</div>
                  <div className="flex flex-col mr-4">
                      <img src={ArrowUp} alt="inc" className="cursor-pointer h-4 my-1" onClick={() => {setLandplotAmount(Math.min(3, landplotAmount + 1));}} />
                      <img src={ArrowDown} alt="dec" className="cursor-pointer h-4 my-1" onClick={() => {setLandplotAmount(Math.max(1, landplotAmount - 1));}} />
                  </div>
                </div>
                <button className="bg-[#00F0FF] rounded-[2px] px-2 ml-4 font-black"
                  onClick={()=>onMint(true)}
                >
                  MINT
                </button>
              </div>
            )
          }
        </div>

        <div className="flex flex-col min-h-[1px] w-full md:w-1/3 z-40">
          <div className="flex item-center justify-center text-center text-white w-full px-[20px] my-[40px]">
            <div id="text-shadow-description" className="font-bold text-[20px] max-w-[320px]">
              <p className="mb-[40px] text-[24px]">MOONVERSE STAGE ONE RELEASE</p>
              <p className="mb-[40px]">Just <span className="text-[#00F0FF]">7,600 Moonverse Land Plots</span> and <span className="text-[#00F0FF]">7,600 Monverse Astronauts</span> are available.</p>
              <p className="mb-[40px]">Connect your wallet (top left) then enter a number beneath land or astronauts and <span className="text-[#00F0FF]">press ‘mint’</span> to buy (max 3 per wallet). </p>
              <p className="mb-[40px]">Make sure you have <span className="text-[#00F0FF]">Wrapped ETH</span> in your wallet to purchase. Check out our <span className="text-[#00F0FF] underline decoration-[#00F0FF] decoration-2">Moonverse NFT buyers guide</span> for assistance.</p>
            </div>
          </div>
          
          
        </div>

        <div id="og-right" className="flex flex-col self-end min-h-[1px] w-full h-full justify-end pb-[40px] md:w-1/3">
          <div className="flex justify-end">
            <img src={Icon2} alt="og-right" />
          </div>
          <div id="text-shadow-description" className="font-bold text-center text-white text-[20px] text-white mt-[-100px]">
            <div className=" fontFamily:'Obitron' font-black text-[42px]">
            <span id="text-shadow-mint">MINT NOW FOR</span>
              <br />
              <span id="text-shadow-mint">ONLY</span>
              <span className="text-[#EFA20C]"> .07 ETH</span>
            </div>
          </div>
          { /*!loading &&*/ ( needApproveAstronaut?
              <div className="flex justify-center py-4 fontFamily:'Obitron' text-[42px]">
                <button className="bg-[#00F0FF] rounded-[2px] px-4 ml-4 font-black"
                    onClick={()=>onApprove(false)}
                  >
                    Approve
                </button>
              </div>
              :
              <div className="flex justify-center py-4 fontFamily:'Obitron' text-[42px]">
                <div className="flex justify-center items-center border-2 border-[#00F0FF] rounded-[2px]">
                  <div className="text-[#00F0FF] mx-4 w-8 ">{astronautAmount}</div>
                  <div className="flex flex-col mr-4">
                      <img src={ArrowUp} alt="inc" className="cursor-pointer h-4 my-1" onClick={() => {setAstronautAmount(Math.min(3, astronautAmount + 1));}} />
                      <img src={ArrowDown} alt="dec" className="cursor-pointer h-4 my-1" onClick={() => {setAstronautAmount(Math.max(1, astronautAmount - 1));}} />
                  </div>
                </div>
                <button className="bg-[#00F0FF] rounded-[2px] px-2 ml-4 font-black"
                  onClick={()=>onMint(false)}
                >
                  MINT
                </button>
              </div>
            )
          }
        </div>
      </div>
      {/* {loading && <Loader />} */}
    </div>
  );
}

export default Landy;
