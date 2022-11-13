import React from 'react'
import './LoadingScreen.css';
import funnyGif from '../../assets/coffee3.gif';
import loaderGif from '../../assets/loader.gif';
import { useState } from 'react';
import ConfettiGenerator from "confetti-js";
import { useEffect } from 'react';

function LoadingScreen({isWalletOpen, isTxnUnderway, setIsDialogVisible}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);

    useEffect(() => {
        if (isConfettiVisible) {
            const confettiSettings = { target: 'canvas',
            clock: 50,
            max: 200,
            start_from_edge: true,
            };
            const confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();
        }
    }, [isConfettiVisible])
    
    

    const DialogLoader = () => {
        const closeDialog = () => {
            setIsDialogVisible(false);
        }
        return (
            <>
                <canvas id='canvas' className="coffee-plate"></canvas>
                {
                    isTxnUnderway ? 
                    <TxnLoader /> : 
                    <>
                        {setIsConfettiVisible(true)}                      
                        <div className="thank-you">
                            <span>
                                <h1>🥳 THANK YOU! 🥳</h1> 
                                <h1>YOU ARE AWESOME!</h1>
                                <section className='close' onClick={closeDialog}>✖</section>
                            </span>
                        </div>
                    </>
                }
            </>
        )
    }

    const TxnLoader = () => {
        return (
            <> 
                {
                    isLoaded ? 
                    null : 
                    <div className="loader">
                        <img src={loaderGif}></img>
                    </div>                               
                }
                <div className="funny-load">
                    { isLoaded ? <h1>⚒️ ...TRANSACTION UNDERWAY... ⚒️</h1> : null }                    
                    <img src={funnyGif}
                    onLoad={() => setIsLoaded(true)}
                    style={isLoaded ? {} : {display: 'none'}} ></img>
                </div>
                
            </>
        );
    }

    const SignIndicator = () => {
        return (
            <>
                <div className="coffee-plate"></div>
                <div className="sign-please">
                    <div className="sign-it">
                        <span className='sign-text'>🦊 Approve the transaction 👉</span>
                    </div>
                </div>
            </>
        );
    }

  return (
    <>
        {
            isWalletOpen ? <SignIndicator /> : <DialogLoader />
            // isWalletOpen ? <DialogLoader /> : <SignIndicator />
        }
    </>
    
  )
}

export default LoadingScreen