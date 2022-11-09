import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../App.css';

function DisplayMemos({buyCoffeeInstance}) {

  const [memoList, setMemoList] = useState('');
  // function to connect to the smart contract and fetch memos to display on screen
  const memoFetcher = async () => {
    try {
      console.log('Let\'s go fetch some memos!');
      let fetchedMemos = await buyCoffeeInstance.getMemos();
      return fetchedMemos;
    } catch (error) {
      alert('There has been as error:\n', error);
    }
  }

  // setMemoList(memoFetcher);
  con0sole.log('This is what we got from the smart contract -', memoList);

  // useEffect( () => {

  // }, []);

    
  return (
    <div className='memo-wrapper'>
        {

        }
    </div>
  )
}

export default DisplayMemos