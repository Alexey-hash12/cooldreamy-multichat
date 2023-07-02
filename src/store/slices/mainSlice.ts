import { createSlice } from "@reduxjs/toolkit";
import initState from "../initState";


const mainSlice = createSlice({
    name: 'main',
    initialState: initState,
    reducers: {
        main_tokenUpdate: (state, action) => {state.token = action.payload},
        main_tokenDelete: (state) => {state.token = null},
        main_updateAdminId: (state,action) => {state.adminId = action.payload},
        main_updateSocket: (state, action) => {state.socketChanel = action.payload},
        main_updateNewMessage: (state, action) => {state.newMessage = action.payload}
    }
})


const {actions, reducer} = mainSlice

export default reducer;

export const {
    main_tokenDelete,
    main_tokenUpdate,
    main_updateAdminId,
    main_updateSocket,
    main_updateNewMessage
} = actions