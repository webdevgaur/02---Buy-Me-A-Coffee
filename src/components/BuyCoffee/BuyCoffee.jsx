import React from 'react';
import { useState } from 'react';
import '../../App.css';
import './BuyCoffee.css';
import { ethers } from 'ethers';
import contractBinary from '../../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json';
import { messagePrefix } from '@ethersproject/hash';

function BuyCoffee({ethObject}) {

  const [userMessage, setUserMessage] = useState('');
  const [userName, setUserName] = useState('');
  const CONTRACT_ADDRESS = '0xF12302aD3f1e1cc1179730E211d91A8E1AD299C2';

  const CoffeeBuyingButton = () => {
      return(
        <button type='submit' onClick={buyCoffee}>Buy coffee for 0.001 ETH</button>
      );
    }

  const handleMessageInput = (event) => {
    setUserMessage(event.target.value);
  }

  const handleNameInput = (event) => {
    setUserName(event.target.value);
  }

  const getSmartContractInstance = () => {
    if(!ethObject) {
      alert('Wallet not found! Install metamask. 🦊');
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethObject);
    const signer = provider.getSigner();
    const buyMeACoffeeContract = new ethers.Contract(CONTRACT_ADDRESS, contractBinary.abi, signer);
    return buyMeACoffeeContract;
    
  }

  const buyCoffee = async () => {
    try {

      const buyCoffeeInstance = getSmartContractInstance();

      console.log('🚀 Begin buying coffee transaction 🚀')
      const coffeeTxn = await buyCoffeeInstance.buyCoffee(
        userName ? userName : 'A kind stranger 🤗',
        userMessage ? userMessage : 'Enjoy your ☕☕. I am generous with my ETH 💸 but not my time 🕒. ',
        {value: ethers.utils.parseEther('0.001')}
      );

      console.log('Mining underway... ⚒️');
      await coffeeTxn.wait();
      console.log('Transaction mined! 👷 \nEnjoy your coffee!');

      setUserName('');
      setUserMessage('');

    } catch (error) {
      alert('There has been an error!❌', error);
    }
  }

  return (
    <>
        <div className="name-input">
          <input className='input-field' placeholder='Enter your name' value={userName} onChange={handleNameInput}></input>
        </div>
        <div className='text-area-div'>
            <textarea className='text-area' placeholder='Enter your message here' value={userMessage} onChange={handleMessageInput}></textarea>
        </div>
        <CoffeeBuyingButton />
    </>
  )
}

export default BuyCoffee