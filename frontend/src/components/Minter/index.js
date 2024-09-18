import React, { useState, useContext, useEffect } from "react";
import Icon1 from "../../img/ast1.png";
import Icon2 from "../../img/ast2.png";
import ArrowDown from "../../img/arrow-down.png";
import ArrowUp from "../../img/arrow-up.png";
import Loader from "../Loader"
import { allowance, approve, needApporve } from "../../utils/weth";
import { mint } from "../../utils/genesisastronaut";
import { SuccessNotifier, FailedNotifier, WarningNotifier } from "../../utils/notifier"
import { AppContext } from "../../context";

function Minter() {
  const [ amount, setAmount ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [ isApprove, setIsApprove ] = useState(false);
  const { walletAddress } = useContext(AppContext)

  useEffect(()=>{
    const fn = async() => {
      setLoading(true);
      let allowed = await allowance(walletAddress);
      if ( needApporve(allowed) ) {
        setIsApprove(true);
      } else {
        setIsApprove(false);
      }
      setLoading(false)
    }

    if ( walletAddress ) {
      fn();
    }
  }, [walletAddress])

  const onApprove = async () => {
    try {
      if (!walletAddress) {
        WarningNotifier("Please connect metamask.");
        return;
      }

      setLoading(true);
      let tx = await approve();
      console.log(tx, tx.hash);
      let result = await tx.wait();
      if ( result.status === 0 ) {
        FailedNotifier("Approvement failed. Check transaction.");
      } else {
        setLoading(false);
        setIsApprove(false);
        SuccessNotifier("Approvement Success. You can mint for now.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      FailedNotifier("Failed.");
    }
  }
  const onMint = async () => {
    try {
      if (!walletAddress) {
        WarningNotifier("Please connect metamask.");
        return;
      }

      setLoading(true);
      let tx = await mint(amount);
      console.log(tx.hash);
      let result = await tx.wait();
      if ( result.status === 0 ) {
        setLoading(false);
        FailedNotifier("Mint failed. Check transaction.");
      } else {
        setLoading(false);
        SuccessNotifier("Mint Success");
      }
    } catch (error) {
      let msg = error.data? error.data.message:error.message;
      setLoading(false);
      console.log(error);
      FailedNotifier(msg);
    }
  }

  return (
    <div id="Minter" className="w-full pt-[130px] min-h-[80vh] md:pt-[100px]">
      <div className="flex flex-wrap justify-center items-center mx-auto">
        <div id="og-left" className="flex min-h-[1px] w-full h-full md:w-1/3">
          <img src={Icon1} alt="og-left" />
        </div>

        <div className="flex flex-col min-h-[1px] w-full md:w-1/3 z-40">
          <div className="flex flex-col items-center text-center text-white w-full px-[20px] my-[40px]">
            <div id="text-shadow-description" className="font-bold text-[20px] max-w-[320px]">
              <p className="mb-[40px]">
              Each Genesis Astronaut holder gets
              <span className="text-[#00F0FF]"> access to our IDO private round </span>
              plus airdopped NFTs (Moonverse land + extra astronaut NFT + jetpack)
              </p>
              <p className="mb-[40px]">
              <span className="text-[#00F0FF]">Only 300 Available!</span>
              </p>
              <p className="mb-[40px]">
              Make sure you select
              <span className="text-[#00F0FF]"> Polygon </span>
              <span>in your wallet to purchase. Check out our </span>
              <span className="underline decoration-[#1E2659] decoration-2">NFT buyers guide</span>
              <span> if you need assistance. </span>
              </p>
            </div>
            <div className=" fontFamily:'Obitron' font-black text-[42px]">
              <span id="text-shadow-mint">MINT NOW FOR</span>
              <span className="text-[#EFA20C]">.25 ETH</span>
              </div>
          </div>
          { !loading && ( isApprove?
              <div className="flex justify-center py-4 fontFamily:'Obitron' text-[42px]">
                <button className="bg-[#00F0FF] rounded-[2px] px-4 ml-4 font-black"
                    onClick={onApprove}
                  >
                    Approve
                </button>
              </div>
              :
              <div className="flex justify-center py-4 fontFamily:'Obitron' text-[42px]">
                <div className="flex justify-center items-center border-2 border-[#00F0FF] rounded-[2px]">
                  <div className="text-[#00F0FF] mx-4 w-8 ">{amount}</div>
                  <div className="flex flex-col mr-4">
                      <img src={ArrowUp} alt="inc" className="cursor-pointer h-4 my-1" onClick={() => {setAmount(Math.min(2, amount + 1));}} />
                      <img src={ArrowDown} alt="dec" className="cursor-pointer h-4 my-1" onClick={() => {setAmount(Math.max(1, amount - 1));}} />
                  </div>
                </div>
                <button className="bg-[#00F0FF] rounded-[2px] px-2 ml-4 font-black"
                  onClick={onMint}
                >
                  MINT
                </button>
              </div>
            )
          }
          
        </div>

        <div id="og-right" className="flex min-h-[1px] w-full h-full justify-end md:w-1/3">
          <img src={Icon2} alt="og-right" />
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default Minter;
