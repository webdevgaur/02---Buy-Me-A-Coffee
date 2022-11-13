import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../App.css';
import './DisplayMemos.css';

function DisplayMemos({buyCoffeeInstance, userAccount, memoEntry}) {

  

  const [memoList, setMemoList] = useState([]);
  // function to connect to the smart contract and fetch memos to display on screen
  const memoFetcher = async () => {
    try {
      console.log('Let\'s go fetch some memos!');
      let fetchedMemos = await buyCoffeeInstance.getMemos();
      console.log('Memos fetched from the smart contract -', fetchedMemos);
      console.log('Investigating further -\n', fetchedMemos[0], '\n', typeof(fetchedMemos[0]), '\n',  )
      setMemoList(fetchedMemos);
    } catch (error) {
      alert('There has been as error in DisplayMemos.jsx', error);
    }
  }  
 
  useEffect( () => {
    memoFetcher();
  }, [memoEntry]);

    
  return (
    <div className='memo-wrapper'>
        {
          memoList.map((message, index) => {
            return (
              <div className={`memo-object ${message.from.toLowerCase() === userAccount ? 'active' : ''}`} key={index}>
                <p><strong>{message.name}</strong> says -</p>
                <p className='message'>{message.message}</p>
                <p className='timestamp'>{
                  new Date(message.timestamp.toNumber()*1000).toDateString()
                  }
                </p>
              </div>
            )
          })
        }
    </div>
  )
}

export default DisplayMemos