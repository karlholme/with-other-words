import React from "react";
// import _ from 'lodash';
import { hot } from 'react-hot-loader/root';
// import * as core from './core';
import setupComponentMaker from '../features/gameSetup/setup';
import nameTeamsComponentMaker from '../features/gameSetup/nameTeams';
import summaryComponentMaker from '../features/activeGame/summary';
import roundComponentMaker from '../features/activeGame/round';
import gameSummaryComponentMaker from '../features/gameSummary/summary';

import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from './routerSlice';
import { setAmountOfRounds, setAmountOfTeams, setPassPerRound, setRoundLength } from '../features/gameSetup/setupSlice';
import { newGameStarted, wordCompleted, roundEnded, resetGame, teamNameChanged } from '../features/activeGame/gameSlice';

const SetupComponent = setupComponentMaker();
const NameTeamsComponent = nameTeamsComponentMaker();
const SummaryComponent = summaryComponentMaker();
const RoundComponent = roundComponentMaker();
const GameSummaryComponent = gameSummaryComponentMaker();

// TODO
// Bryt ut staplar
// Pass
// PWA
// Landscape mode

function App() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <>
            <header>
                <span className="header-text">
                    Med Andra Ord
                </span>
            </header>
            <div className="app">
                {state.router.activePage === 'setup' &&
                    <SetupComponent
                        amountOfTeams={state.setup.amountOfTeams}
                        amountOfRounds={state.setup.amountOfRounds}
                        roundLength={state.setup.roundLength}
                        passPerRound={state.setup.passPerRound}
                        triggerEvent={function (event) {
                            if (event.name === 'AMOUNT-OF-TEAMS-CHANGED') {
                                dispatch(setAmountOfTeams(event.data));
                            } else if (event.name === 'AMOUNT-OF-ROUNDS-CHANGED') {
                                dispatch(setAmountOfRounds(event.data));
                            } else if (event.name === 'ROUNDS-LENGTH-CHANGED') {
                                dispatch(setRoundLength(event.data));
                            } else if (event.name === 'PASS-PER-ROUND-CHANGED') {
                                dispatch(setPassPerRound(event.data))
                            } else if (event.name === 'NEW-GAME-PRESSED') {
                                dispatch(newGameStarted({
                                    totalRounds: state.setup.totalRounds,
                                    amountOfTeams: state.setup.amountOfTeams
                                }))
                                dispatch(setActivePage('name-teams'))
                            }
                        }}
                    />
                }
                {state.router.activePage === 'name-teams' &&
                    <NameTeamsComponent
                        amountOfTeams={state.setup.amountOfTeams}
                        teamNames={state.game.teamScores}
                        triggerEvent={function (event) {
                            if (event.name === 'TEAM-NAME-CHANGED') {
                                dispatch(teamNameChanged(event.data));
                            } else if (event.name === 'CONTINUE-PRESSED') {
                                dispatch(setActivePage('game'))
                            }
                        }}
                    />
                }
                {state.game.gameEnded &&
                    <GameSummaryComponent
                        amountOfRounds={state.setup.amountOfRounds}
                        activeTeam={state.game.activeTeam}
                        round={state.game.round}
                        teamScores={state.game.teamScores}
                        triggerEvent={function (event) {
                            if (event.name === 'NEW-ROUND-SELECTED') {
                                dispatch(resetGame())
                                dispatch(setActivePage('setup'))
                            }
                        }}
                    />
                }
                {state.router.activePage === 'game' && !state.game.gameEnded &&
                    <SummaryComponent
                        amountOfRounds={state.setup.amountOfRounds}
                        activeTeam={state.game.activeTeam}
                        round={state.game.round}
                        teamScores={state.game.teamScores}
                        triggerEvent={function (event) {
                            if (event.name === 'ROUND-STARTED-PRESSED') {
                                dispatch(setActivePage('round'))
                            }
                        }}
                    />
                }
                {state.router.activePage === 'round' &&
                    <RoundComponent
                        totalTime={state.setup.roundLength}
                        activeTeam={state.game.activeTeam}
                        roundScore={state.game.roundScore}
                        wordToGuess={state.game.nextWordToGuess}
                        round={state.game.round}
                        triggerEvent={function (event) {
                            if (event.name === 'WORD_COMPLETED') {
                                dispatch(wordCompleted())
                            } else if (event.name === 'ROUND_ENDED') {
                                dispatch(roundEnded(state.setup.amountOfRounds));
                                dispatch(setActivePage('game'));
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}

export default hot(App);
