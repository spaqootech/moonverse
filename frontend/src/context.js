import React, { createContext, useState } from 'react'

const walletAddress = ''

export const AppContext = createContext({
  walletAddress,
  handleWalletAddress() {},
})

export function WalletProvider({ children }) {
  
  const [walletAddress, setWalletAddress] = useState("")
  const handleWalletAddress = (address) => setWalletAddress(address)

  return (
    <AppContext.Provider value={{ walletAddress, handleWalletAddress }}>
      {children}
    </AppContext.Provider>
  )
}
