import React, { useEffect } from "react";
import buttonMaker from '../../common/button';

const Button = buttonMaker();

export default function activeGamePageMaker() {

    function convertSecondsToMinutesAndSek(sek) {
        const minutes = Math.trunc(sek / 60);
        const sekLeft = sek - (60 * minutes);
        const sekWithLeadingZero = (String(sekLeft).length === 1) ? ('0' + sekLeft) : sekLeft;
        return minutes + ':' + sekWithLeadingZero;
    }

    function RoundComponent({ triggerEvent, wordToGuess, totalTime, roundScore }) {
        const [counter, setCounter] = React.useState(totalTime);
        const timeLeft = convertSecondsToMinutesAndSek(counter);

        useEffect(() => {
            let timer;
            if (counter > 0) {
                timer = setInterval(() => setCounter(counter - 1), 1000);
            } else {
                triggerEvent({ name: 'ROUND_ENDED' });
            }
            return () => clearInterval(timer);
        }, [counter]);

        return (
            <>
                <div className="point-circle">
                    <div className="point-circle-text">{roundScore} P</div>
                </div>
                <div className="page-header" style={{height: '18vh'}}>
                    <h1 title={'OMGÅNG'} style={{ marginTop: '.1vh', marginBottom: '0', paddingBottom: '0' }}>OMGÅNG</h1>
                    <h1 title={timeLeft} style={{ marginTop: '0', paddingTop: '0' }}>{timeLeft}</h1>
                </div>

                <div className="main-content" style={{ justifyContent: 'center', height: '53vh' }}>
                    <div title={wordToGuess} className="gradient-text">{wordToGuess}</div>
                </div>

                <footer>
                    <Button label="👍" onClick={function () {
                        triggerEvent({ name: 'WORD_COMPLETED' });
                    }} />
                </footer>
            </>
        )
    }

    return function (props) {
        return <RoundComponent {...props} />;
    }
}
