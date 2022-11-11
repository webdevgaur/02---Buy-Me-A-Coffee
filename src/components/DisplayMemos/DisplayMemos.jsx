import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../App.css';

function DisplayMemos({buyCoffeeInstance, userAccount}) {

  const [memoList, setMemoList] = useState([]);
  // function to connect to the smart contract and fetch memos to display on screen
  const memoFetcher = async () => {
    try {
      console.log('Let\'s go fetch some memos!', buyCoffeeInstance);
      let fetchedMemos = await buyCoffeeInstance.getMemos();
      console.log('Memos fetched from the smart contract -', fetchedMemos);
      setMemoList(fetchedMemos);
      let dateHex = fetchedMemos[0].timestamp;
      console.log(dateHex);
      let dateNum = dateHex.toNumber();
      console.log('Timestamp converted:', dateNum, new Date(dateNum));
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
              <div className={`memo-object ${message.from === userAccount ? 'active' : ''}`} data-address={message.from} key={index}>
                <p><strong>{message.name}</strong> says -</p>
                <p>{message.message}</p>

              </div>
            )
          })
        }
    </div>
  )
}

export default DisplayMemos