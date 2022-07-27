import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

// window.ethereum can be viewed in browser window.
const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigned();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({
    provider,
    signer,
    transactionContract,
  })
}

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');

  // Chrcks whether the wallet is connected or not.
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('Install metamask extension to use this application');

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts);
  }

  // Connects your wallet with the front end
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Install metamask extension to use this application');
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(accounts[0]);

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum error or wallet account");

    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  )
}