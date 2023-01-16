import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        amountOfTeams: 2,
        amountOfRounds: 3,
        roundLength: 30,
        passPerRound: 1
    },
    reducers: {
        setAmountOfTeams: (state, action) => {
            state.amountOfTeams = Number(action.payload);
            return state;
        },
        setAmountOfRounds: (state, action) => {
            state.amountOfRounds = Number(action.payload);
            return state;
        },
        setRoundLength: (state, action) => {
            state.roundLength = Number(action.payload);
            return state;
        },
        setPassPerRound: (state, action) => {
            state.passPerRound = action.payload === '∞' ? '∞' : Number(action.payload);
            return state;
        }
    }
});

export default setupSlice.reducer;
export const { setAmountOfTeams, setAmountOfRounds, setRoundLength, setPassPerRound } = setupSlice.actions;
