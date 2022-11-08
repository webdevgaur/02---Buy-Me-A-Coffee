import { useState, useEffect } from 'react';
import BuyCoffee from './components/BuyCoffee/BuyCoffee';
import DisplayMemos from './components/DisplayMemos/DisplayMemos';
import './App.css';

const {ethereum} = window;

const WalletConnetButton = ({setCurrentAccount}) => {
  const connectWallet = async () => {
    try {
      if(!ethereum) {
        alert('Wallet not found! Install metamask. 🦊');
        return;
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log('Hello', accounts[0], ', nice to have you here! 👋');
    } catch (error) {
      alert('⚠️ There has been an error. Check the console (press F12) ⚠️');
      console.log(error);
    }
  }
  return(
    <button type='submit'onClick={connectWallet}>Connect wallet</button>
  );
}

function App() {
  
  const [currentAccount, setCurrentAccount] = useState('');
  
  const checkWalletConnection = async (setCurrentAccount) => {
    if(!ethereum) {
      alert('Wallet not found! Install metamask. 🦊');
      return;
    }
    const accounts = await ethereum.request({method: 'eth_accounts'});
    accounts.length > 0 ? setCurrentAccount(accounts[0]) : console.log('No authorised accounts present.');
  }

  useEffect(() => {
    checkWalletConnection(setCurrentAccount);
  }, []);

  return (
    <div className="App">
      <div className="buying-experience">
        <h1>☕ Buy Anurag a Coffee ☕</h1>
        <h3>And please don't ask why 😡</h3>
        <div className="button-area">
          {
            currentAccount ? <BuyCoffee ethObject={ethereum} /> : <WalletConnetButton setCurrentAccount={setCurrentAccount} />
          }
        </div>
      </div>
      <div className="message-board">
          <DisplayMemos />
      </div>
    </div>
  )
}

export default App
