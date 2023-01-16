import { createSlice } from "@reduxjs/toolkit";
import { words } from "../../util/words";
import { teamNames } from "../../util/teamNames";
import _ from 'lodash';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getNextWord(state) {
    const nextWordIndex = getRndInteger(0, state.wordsToChooseFrom.length)
    const nextWord = state.wordsToChooseFrom[nextWordIndex];
    const wordsLeft = state.wordsToChooseFrom.filter((word) => word !== nextWord);
    return {
        nextWordToGuess: nextWord,
        wordsToChooseFrom: wordsLeft
    }
}

function getMedal(position) {
    if (position === 1) {
        return '🥇';
    } else if (position === 2) {
        return '🥈'
    } else if (position === 3) {
        return '🥉'
    } else {
        return '';
    }
}

const activeGameSlice = createSlice({
    name: 'game',
    initialState: {
        round: 1,
        activeTeam: 1,
        roundScore: 0,
        roundPasses: 0,
        nextWordToGuess: null,
        wordsToChooseFrom: words,
        teamScores: {
            1: {
                name: '',
                score: 0,
                extraInfo: ''
            }
        },
        gameEnded: false
    },
    reducers: {
        teamNameChanged: (state, action) => {
            state.teamScores[action.payload.team].name = action.payload.name;
            return state;
        },
        roundEnded: (state, action) => {
            const amountOfTeams = _.keys(state.teamScores).length;
            const lastTeam = state.activeTeam === amountOfTeams;
            const round = lastTeam ? state.round + 1 : state.round;
            const { nextWordToGuess, wordsToChooseFrom } = getNextWord(state);
            const gameEnded = lastTeam && (action.payload < round);

            // Resets round scores if its a new round
            if (state.activeTeam === 1) {
                for (const team of _.keys(state.teamScores)) {
                    state.teamScores[team].extraInfo = '';
                }
            }

            state.round = round;
            state.teamScores[state.activeTeam].score = state.teamScores[state.activeTeam].score + state.roundScore;
            state.teamScores[state.activeTeam].extraInfo = '+' + state.roundScore;
            state.roundScore = 0;
            state.roundPasses = 0;
            state.activeTeam = lastTeam ? 1 : (state.activeTeam + 1);
            state.gameEnded = gameEnded;
            state.nextWordToGuess = nextWordToGuess;
            state.wordsToChooseFrom = wordsToChooseFrom;

            // Adds medals as extra info
            if (gameEnded) {
                const scoresSorted = _.values(state.teamScores).map((teamScore) => teamScore.score).sort().reverse();

                for (const team of _.keys(state.teamScores)) {
                    const teamScore = state.teamScores[team];
                    const position = _.findIndex(scoresSorted, (score) => score === teamScore.score) + 1;

                    state.teamScores[team].extraInfo = getMedal(position);
                }
            }

            return state;
        },
        newGameStarted: (state, action) => {
            const { nextWordToGuess, wordsToChooseFrom } = getNextWord(state);

            state.round = 1;
            state.activeTeam = 1;
            state.roundScore = 0;
            state.nextWordToGuess = nextWordToGuess;
            state.wordsToChooseFrom = wordsToChooseFrom;
            state.teamScores = [...Array(parseInt(action.payload.amountOfTeams)).keys()].reduce((tot, team) => {
                tot[team + 1] = {
                    name: teamNames[team],
                    score: 0,
                    extraInfo: ''
                }
                return tot;
            }, {})
            state.gameEnded = false;

            return state;
        },
        wordCompleted: (state) => {
            const { nextWordToGuess, wordsToChooseFrom } = getNextWord(state);
            state.nextWordToGuess = nextWordToGuess;
            state.wordsToChooseFrom = wordsToChooseFrom;
            state.roundScore++;

            return state;
        },
        pass: (state) => {
            const { nextWordToGuess, wordsToChooseFrom } = getNextWord(state);
            state.nextWordToGuess = nextWordToGuess;
            state.wordsToChooseFrom = wordsToChooseFrom;
            state.roundPasses++;

            return state;
        },
        resetGame: (state) => {
            state.round = 1;
            state.activeTeam = 1;
            state.roundScore = 1;
            state.nextWordToGuess = null;
            state.wordsToChooseFrom = words;
            state.teamScores = {
                1: {
                    name: '',
                    score: 0,
                    extraInfo: ''
                }
            }
            state.gameEnded = false;

            return state;
        }
    }
});

export default activeGameSlice.reducer;
export const {
    teamNameChanged,
    newGameStarted,
    wordCompleted,
    roundEnded,
    resetGame,
    pass
} = activeGameSlice.actions;
