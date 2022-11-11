import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../App.css';
import './DisplayMemos.css';

function DisplayMemos({buyCoffeeInstance, userAccount}) {

  

  const [memoList, setMemoList] = useState([]);
  // function to connect to the smart contract and fetch memos to display on screen
  const memoFetcher = async () => {
    try {
      console.log('Let\'s go fetch some memos!');
      let fetchedMemos = await buyCoffeeInstance.getMemos();
      console.log('Memos fetched from the smart contract -', fetchedMemos);
      setMemoList(fetchedMemos);
    } catch (error) {
      alert('There has been as error in DisplayMemos.jsx', error);
    }
  }  
 
  useEffect( () => {
    memoFetcher();
  }, []);

    
  return (
    <div className='memo-wrapper'>
        {
          memoList.map((message, index) => {
            return (
              <div className={`memo-object ${message.from.toLowerCase() === userAccount ? 'active' : ''}`} data-address={message.from} key={index}>
                <p><strong>{message.name}</strong> says -</p>
                <p className='message'>{message.message}</p>
                <p className='timestamp'>{new Date(message.timestamp.toNumber()*1000).toDateString()}</p>
              </div>
            )
          })
        }
    </div>
  )
}

export default DisplayMemos