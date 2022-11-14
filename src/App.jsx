import { useState, useEffect } from 'react';
import BuyCoffee from './components/BuyCoffee/BuyCoffee';
import DisplayMemos from './components/DisplayMemos/DisplayMemos';
import contractBinary from './artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json';
import './App.css';
import { ethers } from 'ethers';

const {ethereum} = window;
const CONTRACT_ADDRESS = '0xE5C0C8Ce3703E5035127AcF3D75dF0009f00bD4D';

const WalletConnetButton = ({setCurrentAccount}) => {
  const connectWallet = async () => {
    try {
      if(!ethereum) {
        alert('Wallet not found! Install metamask. 🦊');
        return;
      }
      const goerliChainId = '0x5';
      let currentChainId = await ethereum.request({method: 'eth_chainId'});
      if(currentChainId !== goerliChainId) {
        alert('You are not connected to the Goerli test network.\nConnect to the Goeli test network otherwise your funds can get lost.')
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log('Hello', accounts[0], ', nice to have you here! 👋');
    } catch (error) {
      alert('⚠️ There has been an error while connecting your wallet. Check the console (press F12) ⚠️');
      console.log(error);
    }
  }
  return(
    <button type='submit'onClick={connectWallet}>Connect wallet</button>
  );
}

const getSmartContractInstance = () => {
  if(!ethereum) {
    alert('Wallet not found! Install metamask. 🦊');
    return;
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const buyMeACoffeeContract = new ethers.Contract(CONTRACT_ADDRESS, contractBinary.abi, signer);
  return buyMeACoffeeContract;
  
}

function App() {
  
  
  const [currentAccount, setCurrentAccount] = useState('');
  const [memoEntry, setMemoEntry] = useState({});
  const buyMeACoffeeContract = getSmartContractInstance();
  
  const checkWalletConnection = async () => {
    if(!ethereum) {
      alert('Wallet not found! Install metamask. 🦊');
      return;
    }
    const accounts = await ethereum.request({method: 'eth_accounts'});
    accounts.length > 0 ? setCurrentAccount(accounts[0]) : console.log('No authorised accounts present.');
  }

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <div className="App">
      <div className="buying-experience">
        <h1>☕ Buy Anurag a Coffee ☕</h1>
        <h3>And please don't ask why 😡</h3>
        <div className="button-area">
          {
            currentAccount ? <BuyCoffee buyCoffeeInstance={buyMeACoffeeContract} userAccount={currentAccount} setMemoEntry={setMemoEntry} /> : <WalletConnetButton setCurrentAccount={setCurrentAccount} />
          }
        </div>
      </div>
      <div className="message-board">
          {
            currentAccount && <DisplayMemos buyCoffeeInstance={buyMeACoffeeContract} userAccount={currentAccount} memoEntry={memoEntry} />
          }
      </div>
    </div>
  )
}

export default App
