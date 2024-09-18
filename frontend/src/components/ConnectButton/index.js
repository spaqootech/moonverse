import { useEffect, useContext } from 'react';
import { chainInfo } from '../../utils/constants';
import { WarningNotifier, SuccessNotifier, FailedNotifier } from '../../utils/notifier';
import { AppContext } from '../../context'

function ConnectButton({lb}) {
    const { walletAddress, handleWalletAddress } = useContext(AppContext)

    const getChainId = async () => {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        return chainId;
    }

    const connectWallet = async () => {
        if (window.ethereum) {
          try {
            const chain = await getChainId()
            if (chain === chainInfo.chainId) {
              const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
              })
              if (addressArray.length > 0) {
                handleWalletAddress(addressArray[0])
              } else {
                handleWalletAddress("")
              }
            } else {
              window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId:chainInfo.chainId }],
              })
                .then(async()=>{
                  const addressArray = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                  })
                  if (addressArray.length > 0) {
                    handleWalletAddress(addressArray[0])
                  } else {
                    handleWalletAddress("")
                  }
                })
                .catch((err)=>{
                  handleWalletAddress("")
                  // Some unexpected error.
                  if (err.code === 4902) {
                    window.ethereum.request({
                          method: 'wallet_addEthereumChain',
                          params: [{
                                          chainId: chainInfo.chainId,
                                          chainName: chainInfo.chainName,
                                          nativeCurrency: {
                                              name: chainInfo.nativeCurrency.name,
                                              symbol: chainInfo.nativeCurrency.symbol,
                                              decimals: chainInfo.nativeCurrency.decimals
                                          },
                                          rpcUrls: [chainInfo.rpcUrls],
                                          blockExplorerUrls: [chainInfo.blockExplorerUrls]
                                      }],
                      })
                      .then(() => {
                        SuccessNotifier("New chain added successfully.");
                      })
                      .catch(addChainerr=>{
                        FailedNotifier("Failed.");
                      });
                  } else if (err.code === -32002) {
                    WarningNotifier("Request already pending. Please check your metamask.")
                  }
                })
            }
            
          } catch (err) {
            handleWalletAddress("")
          }
        } else {
            handleWalletAddress("")
            WarningNotifier('Please install Metamask, a virtual Ethereum wallet, in your browser.')
            console.log('alert-You must install Metamask, a virtual Ethereum wallet, in your browser.')
        }
      }
    

    // const connectWallet = async () => {
    //     if (window.ethereum) {
    //       try {
    //         const chain = await getChainId()
    //         if (chain === chainInfo.chainId) {
    //           const addressArray = await window.ethereum.request({
    //             method: 'eth_requestAccounts',
    //           })
    //           if (addressArray.length > 0) {
    //             handleWalletAddress(addressArray[0])
    //           } else {
    //             handleWalletAddress("")
    //           }
    //         } else {
    //           window.ethereum.request({
    //             method: 'wallet_switchEthereumChain',
    //             params: [{ chainId:chainInfo.chainId }],
    //           })
    //             .then(async()=>{
    //               const addressArray = await window.ethereum.request({
    //                 method: 'eth_requestAccounts',
    //               })
    //               if (addressArray.length > 0) {
    //                 handleWalletAddress(addressArray[0])
    //               } else {
    //                 handleWalletAddress("")
    //               }
    //             })
    //             .catch((err)=>{
    //               handleWalletAddress("")
    //               // Some unexpected error.
    //               if (err.code === 4902) {
    //                 window.ethereum.request({
    //                       method: 'wallet_addEthereumChain',
    //                       params: [{
    //                                       chainId: chainInfo.chainId,
    //                                       chainName: chainInfo.chainName,
    //                                       nativeCurrency: {
    //                                           name: chainInfo.nativeCurrency.name,
    //                                           symbol: chainInfo.nativeCurrency.symbol,
    //                                           decimals: chainInfo.nativeCurrency.decimals
    //                                       },
    //                                       rpcUrls: [chainInfo.rpcUrls],
    //                                       blockExplorerUrls: [chainInfo.blockExplorerUrls]
    //                                   }],
    //                   })
    //                   .then(() => {
    //                     SuccessNotifier("New chain added successfully.");
    //                   })
    //                   .catch(addChainerr=>{
    //                     FailedNotifier("Failed.");
    //                   });
    //               } else if (err.code === -32002) {
    //                 WarningNotifier("Request already pending. Please check your metamask.")
    //               }
    //             })
    //         }
            
    //       } catch (err) {
    //         handleWalletAddress("")
    //       }
    //     } else {
    //         handleWalletAddress("")
    //         WarningNotifier('Please install Metamask, a virtual Ethereum wallet, in your browser.')
    //         console.log('alert-You must install Metamask, a virtual Ethereum wallet, in your browser.')
    //     }
    //   }
    
    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                connectWallet();
            });

            window.ethereum.on("chainChanged", (chain) => {
                // c onnectWalletPressed()
                if (chain !== chainInfo.chainId) {
                  handleWalletAddress("");
                }
            });
        } else {
            handleWalletAddress("")
            WarningNotifier('Please install Metamask, a virtual Ethereum wallet, in your browser.')
            console.log('alert-You must install Metamask, a virtual Ethereum wallet, in your browser.')
        }
    }
    
    useEffect(() => {
        addWalletListener()
        connectWallet()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
            <button
              onClick={connectWallet}
              className="border border-[#00F0FF] no-underline px-2 text-gray-200 font-medium"
            >
              {walletAddress.length > 0 ? (
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
                ) : (
                  lb
                )}
            </button>
    );

}


export default ConnectButton;
