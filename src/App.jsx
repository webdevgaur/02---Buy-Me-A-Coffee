import { ethers } from 'ethers';
import contractBinary from './artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json';
import { useState } from 'react';
import './App.css';

const CONTRACT_ADDRESS = '0xF12302aD3f1e1cc1179730E211d91A8E1AD299C2';

const CoffeeBuyingButton = () => {
  return(
    <button type='submit'>Buy the coffee</button>
  );
}

const {ethereum} = windows;

const getSmartContractInstance = () => {
  if(!ethereum) alert('Wallet not found! Install metamask.');
  else {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const buyMeACoffeeContract = new ethers.Contract(CONTRACT_ADDRESS, contractBinary.abi, signer);
    return buyMeACoffeeContract;
  }
}

function App() {
  

  return (
    <div className="App">
      <div className="buying-experience">
        <h1>☕ Buy Anurag a Coffee ☕</h1>
        <h3>And please don't ask why 😡</h3>

      </div>
      <div className="message-board"></div>
    </div>
  )
}

export default App
