import React from "react";
import buttonMaker from '../../common/button';
import dropdownMaker from '../../common/dropdown';

const Button = buttonMaker();
const Dropdown = dropdownMaker();

export default function newGamePageMaker() {
    function NewGamePageComponent({ triggerEvent, amountOfTeams, amountOfRounds, roundLength, passPerRound }) {
        return (
            <>
                <div className="page-header">
                    <h1 title={'INSTÄLLNINGAR'}>INSTÄLLNINGAR</h1>
                </div>
                <div className="main-content">
                    <Dropdown
                        title="Antal lag 🧑‍🤝‍🧑"
                        placeholder="Välj.."
                        alternatives={[1, 2, 3, 4, 5, 6]}
                        onChange={function (event) {
                            triggerEvent({ name: 'AMOUNT-OF-TEAMS-CHANGED', data: event.target.value })
                        }}
                        value={amountOfTeams}
                    />
                    <Dropdown
                        title="Antal rundor ♺"
                        placeholder="Välj.."
                        alternatives={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        onChange={(event) => triggerEvent({ name: 'AMOUNT-OF-ROUNDS-CHANGED', data: event.target.value })}
                        value={amountOfRounds}
                    />
                    <Dropdown
                        title="Tidsgräns sek ⏱"
                        placeholder="Välj.."
                        alternatives={[30, 45, 60, 75]}
                        onChange={(event) => triggerEvent({ name: 'ROUNDS-LENGTH-CHANGED', data: event.target.value })}
                        value={roundLength}
                    />
                    <Dropdown
                        title="Pass per runda 🚫"
                        placeholder="Välj.."
                        alternatives={[0, 1, 2, 3, '∞']}
                        onChange={(event) => triggerEvent({ name: 'PASS-PER-ROUND-CHANGED', data: event.target.value })}
                        value={passPerRound}
                    />
                </div>
                <footer>
                    <Button
                        type="primary"
                        label="let's go"
                        onClick={function () {
                            triggerEvent({ name: 'NEW-GAME-PRESSED' })
                        }}
                    />
                </footer>
            </>
        )
    }

    return function (props) {
        return <NewGamePageComponent {...props} />;
    }
}
