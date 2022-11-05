import { ethers } from 'ethers';
import contractBinary from './artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json';
import { useState, useEffect } from 'react';
import './App.css';

const CONTRACT_ADDRESS = '0xF12302aD3f1e1cc1179730E211d91A8E1AD299C2';

const {ethereum} = window;

const CoffeeBuyingButton = ({setCurrentAccount}) => {
  return(
    <button type='submit'>Buy the coffee</button>
  );
}

const WalletConnetButton = ({setCurrentAccount}) => {
  const connectWallet = async () => {
    try {
      if(!ethereum) {
        alert('Wallet not found! Install metamask.');
        return;
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log('Hello', accounts[0], ', nice to have you here!');
    } catch (error) {
      alert('There has been an error. Check the console (press F12).');
      console.log(error);
    }
  }
  return(
    <button type='submit'onClick={connectWallet}>Connect wallet</button>
  );
}



const getSmartContractInstance = () => {
  if(!ethereum) {
    alert('Wallet not found! Install metamask.');
    return;
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const buyMeACoffeeContract = new ethers.Contract(CONTRACT_ADDRESS, contractBinary.abi, signer);
  return buyMeACoffeeContract;
  
}

const checkWalletConnection = async (setCurrentAccount) => {
  if(!ethereum) {
    alert('Wallet not found! Install metamask.');
    return;
  }
  const accounts = await ethereum.request({method: 'eth_accounts'});
  accounts.length > 0 ? setCurrentAccount(accounts[0]) : console.log('No authorised accounts present.');
}


function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  useEffect(() => {
    checkWalletConnection(setCurrentAccount);
  }, [])
  return (
    <div className="App">
      <div className="buying-experience">
        <h1>☕ Buy Anurag a Coffee ☕</h1>
        <h3>And please don't ask why 😡</h3>
        <div className="button-area">
          {
            currentAccount ? <CoffeeBuyingButton setCurrentAccount={setCurrentAccount} /> : <WalletConnetButton setCurrentAccount={setCurrentAccount} />
          }
        </div>
      </div>
      <div className="message-board"></div>
    </div>
  )
}

export default App
