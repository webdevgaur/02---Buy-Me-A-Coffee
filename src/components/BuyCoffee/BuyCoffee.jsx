import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import '../../App.css';
import './BuyCoffee.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function BuyCoffee({buyCoffeeInstance, userAccount, setMemoEntry}) {

  const [userMessage, setUserMessage] = useState('');  
  const [userName, setUserName] = useState('');
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isTxnUnderway, setIsTxnUnderway] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

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


  const buyCoffee = async () => {
    try {
      console.log('🚀 Begin buying coffee transaction 🚀');
      setIsWalletOpen(value => !value);
      setIsTxnUnderway(value => !value);
      setIsDialogVisible(value => !value);
      const coffeeTxn = await buyCoffeeInstance.buyCoffee(
        userName ? userName : 'A kind stranger 🤗',
        userMessage ? userMessage : 'Enjoy your ☕☕. I am generous with my ETH 💸 but not my time 🕒',
        {value: ethers.utils.parseEther('0.001')}
      );
      setIsWalletOpen(value => !value);
      console.log('Mining underway... ⚒️');
      await coffeeTxn.wait();
      console.log('Transaction mined! 👷 \nEnjoy your coffee!');
      setIsTxnUnderway(value => !value);

      setMemoEntry(
        {
          from : userAccount,
          name : userName ? userName : 'A kind stranger 🤗',
          message :  userMessage ? userMessage : 'Enjoy your ☕☕. I am generous with my ETH 💸 but not my time 🕒',
          timestamp : Math.floor(Date.now()/1000),
        }
      );

      setUserName('');
      setUserMessage('');

    } catch (error) {
      console.log('Error in the try catch block:', error);
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
        {
          isDialogVisible && <LoadingScreen isWalletOpen={isWalletOpen} isTxnUnderway={isTxnUnderway} setIsDialogVisible={setIsDialogVisible} />
        }
    </>
  )
}

export default BuyCoffee