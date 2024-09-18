import { BigNumber, utils, Contract } from "ethers";
import { _getProvider } from "./ethereum";
import WETH_ABI from "./abi/weth.abi";
import { MINT_PRICE, MINT_PRICE_LANDPLOT, MINT_PRICE_ASTRONAUT, GEN_ADDRESS, LANDPLOT_ADDRESS, ASTRONAUT_ADDRESS, WETH_ADDRESS } from "./constants"

export const balanceOf = async (address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  try {
    const signer = provider.getSigner();
    const contract = new Contract(WETH_ADDRESS, WETH_ABI, signer);
    return await contract.balanceOf(address);
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};

export const allowance = async (address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  console.log(address)
  try {
    const signer = provider.getSigner();
    const contract = new Contract(WETH_ADDRESS, WETH_ABI, signer);
    return await contract.allowance(address, GEN_ADDRESS);
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};

export const approve = async () => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");

  const signer = provider.getSigner();
  const contract = new Contract(WETH_ADDRESS, WETH_ABI, signer);
  const ethCost = '0x10000000000000000000000000000000'

  const gasEstimate = await contract.estimateGas.approve(GEN_ADDRESS, ethCost);
  return await contract.approve(GEN_ADDRESS, ethCost, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const allowanceLand = async (address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  console.log(address)
  try {
    const signer = provider.getSigner();
    const contract = new Contract(WETH_ADDRESS, WETH_ABI, signer);
    let allowed = {};
    allowed["landplot"] = await contract.allowance(address, LANDPLOT_ADDRESS);
    allowed["astronaut"] = await contract.allowance(address, ASTRONAUT_ADDRESS);
    return allowed;
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};

export const approveLand = async (isLandplot) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");

  const signer = provider.getSigner();
  const contract = new Contract(WETH_ADDRESS, WETH_ABI, signer);
  const ethCost = '0x10000000000000000000000000000000'

  let address = isLandplot? LANDPLOT_ADDRESS:ASTRONAUT_ADDRESS;
  console.log(address, isLandplot)
  const gasEstimate = await contract.estimateGas.approve(address, ethCost);
  return await contract.approve(address, ethCost, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};


export const needApporve = (tokens) => {
  const ethCost = utils
      .parseUnits(MINT_PRICE, "ether")
      .mul(BigNumber.from(10));
  // console.log(ethCost.gt(tokens), ethCost, tokens);
  if (ethCost.gt( tokens )) return true;
  else return false;
}


export const checkApporve = (allowed) => {
  const landEthCost = utils
      .parseUnits(MINT_PRICE_LANDPLOT, "ether")
      .mul(BigNumber.from(10));
  const astroEthCost = utils
      .parseUnits(MINT_PRICE_ASTRONAUT, "ether")
      .mul(BigNumber.from(10));
  
  console.log(allowed, landEthCost, astroEthCost);
  let need = {};
  need["landplot"] = landEthCost.gt( allowed?.landplot )? true:false;
  need["astronaut"] = astroEthCost.gt( allowed?.astronaut )? true:false;
  console.log(need)
  return need;
}
