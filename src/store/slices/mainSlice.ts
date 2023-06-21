import { createSlice } from "@reduxjs/toolkit";
import initState from "../initState";


const mainSlice = createSlice({
    name: 'main',
    initialState: initState,
    reducers: {
        main_tokenUpdate: (state, action) => {state.token = action.payload},
        main_tokenDelete: (state) => {state.token = null}
    }
})


const {actions, reducer} = mainSlice

export default reducer;

export const {
    main_tokenDelete,
    main_tokenUpdate
} = actions