import React, { useState } from "react";
import buttonMaker from '../../common/button';
import confetti from 'canvas-confetti';

const Button = buttonMaker();

export default function startPageComponentMaker() {
    function StartPageContent({ triggerEvent }) {
        const [showRules, setShowRules] = useState(false);

        return (
            <>
                <div className={'modal' + (showRules ? ' show' : '')}>
                    <div className="modal-content">
                        <span style={{ fontSize: '7vh', float: 'left' }}>
                            Regler
                        </span>
                        <div style={{ fontFamily: 'Familjen Grotesk', fontSize: 'calc(1.5vw + 1.5vh)', width: '80%' }}>
                            <p>
                                Dela in er i lag med minst två personer i varje lag. Starta omgången och låt en person i laget förklara ordet med andra ord. De andra i laget skall då gissa vilket det rätta ordet är.
                            </p>
                            <p>
                                Du som förklarar får inte använda hela eller någon del av ordet, eller översätta det till annat språk. Du får heller inte använda allt för lika ord, såsom rim.
                            </p>
                            <p>
                                Gissar man på rätt ord, men i en annan börjning eller annat tempus, är det okej.
                            </p>
                        </div>
                        <Button style={{ margin: '3vh' }} label="Stäng" onClick={function () {
                            setShowRules(false);
                        }} />

                    </div>
                </div>

                <div className="main-content" style={{ height: '70vh', paddingTop: '3vh', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '13vh' }} title="MED">MED</h1>
                    <h1 style={{ fontSize: '13vh' }} title="ANDRA">ANDRA</h1>
                    <h1 style={{ fontSize: '13vh' }} title="ORD">ORD</h1>
                </div>

                <footer style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button label="Regler" style={{ marginRight: '3vw' }} onClick={function () {
                        setShowRules(true);
                    }} />
                    <Button label="Spela" onClick={function () {
                        confetti({
                            particleCount: 100,
                            startVelocity: 30,
                            spread: 360,
                            origin: {
                                x: Math.random(),
                                // since they fall down, start a bit higher than random
                                y: Math.random() - 0.2
                            }
                        });
                        triggerEvent({ name: 'START-GAME-SELECTED' })
                    }} />
                </footer>
            </>
        )
    }

    return function StartPage(props) {
        return <StartPageContent {...props} />;
    }
}
