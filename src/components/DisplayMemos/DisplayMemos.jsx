import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../App.css';

function DisplayMemos({buyCoffeeInstance}) {

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
        Will this work?
    </div>
  )
}

export default DisplayMemos