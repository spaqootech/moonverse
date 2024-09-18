import { Contract, BigNumber } from "ethers";
import { _getProvider } from "./ethereum";
import LANDPLOT_ABI from "./abi/landplot.abi";
import { LANDPLOT_ADDRESS } from "./constants"

export const mint = async (tokens) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");

  const signer = provider.getSigner();
  const contract = new Contract(LANDPLOT_ADDRESS, LANDPLOT_ABI, signer);

  const gasEstimate = await contract.estimateGas.mint(tokens, {
    value: BigNumber.from(0),
  });
  return await contract.mint(tokens, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
    value: BigNumber.from(0),
  });
};
