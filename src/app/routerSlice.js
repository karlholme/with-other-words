import {createSlice} from "@reduxjs/toolkit";

const routerSlice = createSlice({
    name: 'router',
    initialState: {
        activePage: 'start'
    },
    reducers: {
        setActivePage: (state, action) => {
            return {
                ...state,
                activePage: action.payload
            }
        }
    }
});

export default routerSlice.reducer;
export const {setActivePage} = routerSlice.actions;
