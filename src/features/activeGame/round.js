import React, { useEffect, useRef } from "react";
import buttonMaker from '../../common/button';
import dingSound from '../../assets/ding.mp3';
import confetti from 'canvas-confetti';

const ding = new Audio(dingSound);
const Button = buttonMaker();

export default function activeGamePageMaker() {

    const touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    function convertSecondsToMinutesAndSek(sek) {
        const minutes = Math.trunc(sek / 60);
        const sekLeft = sek - (60 * minutes);
        const sekWithLeadingZero = (String(sekLeft).length === 1) ? ('0' + sekLeft) : sekLeft;
        return minutes + ':' + sekWithLeadingZero;
    }

    function RoundComponent({ triggerEvent, wordToGuess, totalTime, roundScore, maxPassesPassed }) {
        const [counter, setCounter] = React.useState(totalTime);
        const [showSummary, setShowSummary] = React.useState(false);
        const wordToGuessRef = useRef();
        const timeLeft = convertSecondsToMinutesAndSek(counter);

        useEffect(() => {
            let timer;
            if (counter > 0) {
                timer = setInterval(() => setCounter(counter - 1), 1000);
            } else {
                if (navigator.vibrate) {
                    navigator.vibrate(222);
                }
                ding.play();
                setShowSummary(true);
            }
            return () => clearInterval(timer);
        }, [counter]);

        useEffect(() => {
            let touchstartX = 0;
            let touchendX = 0;

            wordToGuessRef.current.addEventListener('touchstart', e => {
                touchstartX = e.changedTouches[0].screenX
            })

            wordToGuessRef.current.addEventListener('touchmove', e => {
                var deltaX = e.changedTouches[0].screenX - touchstartX;
                wordToGuessRef.current.style.transform = 'translate(' + deltaX + 'px)'
            })

            wordToGuessRef.current.addEventListener('touchend', e => {
                touchendX = e.changedTouches[0].screenX

                if (touchendX < touchstartX) {
                    // swiped left
                    triggerEvent({ name: 'PASS' });
                    confetti.reset();
                    wordToGuessRef.current.style.transform = 'translate(0px)'
                } else if (touchendX > touchstartX) {
                    // swiped right
                    triggerEvent({ name: 'WORD_COMPLETED' });
                    wordToGuessRef.current.style.transform = 'translate(0px)'
                    window.requestAnimationFrame(() => {
                        confetti({
                            particleCount: 30,
                            origin: { y: 1 }
                        });
                        ding.play();
                    })
                }
            })
        }, []);

        return (
            <>
                {showSummary && (
                    <div className="modal show">
                        <div className="modal-content">
                            <div className="page-header" style={{ paddingTop: '0' }}>
                                <h1 title={'OMGÅNG'} style={{ marginTop: '.1vh', marginBottom: '0', paddingBottom: '0' }}>OMGÅNG</h1>
                                <h1 title={timeLeft} style={{ marginTop: '0', paddingTop: '0' }}>{timeLeft}</h1>
                            </div>

                            <div style={{
                                background: '#1b6b67',
                                height: '30vh',
                                width: '30vh',
                                borderRadius: '100vh',
                                border: '2vh #0d3634 solid',
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{ color: 'white', fontSize: '16vh' }}>
                                    +{roundScore}
                                </div>
                                <div style={{ color: 'white', fontSize: '3vh' }}>
                                    Poäng
                                </div>
                            </div>

                            <Button label="OK" onClick={function () {
                                triggerEvent({ name: 'ROUND_ENDED' });
                            }} />

                        </div>
                    </div>
                )}
                <div className="point-circle">
                    <div className="point-circle-text">{roundScore} P</div>
                </div>
                <div className="page-header" style={{ height: '18vh' }}>
                    <h1 title={'OMGÅNG'} style={{ marginTop: '.1vh', marginBottom: '0', paddingBottom: '0' }}>OMGÅNG</h1>
                    <h1 title={timeLeft} style={{ marginTop: '0', paddingTop: '0' }}>{timeLeft}</h1>
                </div>

                <div
                    ref={wordToGuessRef}
                    className="main-content"
                    style={{ justifyContent: 'center', height: '51vh', transition: 'transform .2s', width: '100%' }}>
                    <h1 title={wordToGuess}>{wordToGuess}</h1>
                </div>

                <footer style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {!touchDevice && (
                        <>
                            <Button disabled={maxPassesPassed} label="👎" style={{ marginRight: '3vh' }} onClick={function () {
                                triggerEvent({ name: 'PASS' });
                            }} />
                            <Button label="👍" onClick={function () {
                                triggerEvent({ name: 'WORD_COMPLETED' });
                            }} />
                        </>
                    )}
                </footer>
            </>
        )
    }

    return function (props) {
        return <RoundComponent {...props} />;
    }
}
