"use client"

import { useState, useEffect } from "react"

export const useBlockchain = () => {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccount(accounts[0])
      } else {
        alert("Please install MetaMask!")
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  useEffect(() => {
    // Check if MetaMask is installed and if already connected
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount(null) // No accounts connected
        }
      })

      // Check for already connected accounts on component mount
      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      })
    }
  }, [])

  return { connectWallet, account, isConnecting }
}
