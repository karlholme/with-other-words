import {configureStore} from '@reduxjs/toolkit'
import routerSlice from "./routerSlice";
import setupSlice from "../features/gameSetup/setupSlice";
import gameSlice from "../features/activeGame/gameSlice";

export default configureStore({
    reducer: {
        router: routerSlice,
        setup: setupSlice,
        game: gameSlice
    }
})
