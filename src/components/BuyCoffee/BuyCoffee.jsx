import React from 'react';
import { useState } from 'react';
import '../../App.css';
import './BuyCoffee.css';

function BuyCoffee() {

    const [userMessage, setUserMessage] = useState('');

    const CoffeeBuyingButton = () => {
        return(
          <button type='submit'>Buy coffee for 0.001 ETH</button>
        );
      }

    const handleMessageInput = (event) => {
        setUserMessage(event.target.value);
    }

  return (
    <>
        <div className="name-input"><input className='input-field' placeholder='Enter your name'></input></div>
        <div className='text-area-div'>
            <textarea className='text-area' placeholder='Enter your message here' value={userMessage} onChange={handleMessageInput}></textarea>
        </div>
        <CoffeeBuyingButton />
    </>
  )
}

export default BuyCoffee