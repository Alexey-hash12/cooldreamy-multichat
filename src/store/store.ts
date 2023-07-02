import {configureStore} from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false
//   })

const store = configureStore({
    reducer: {mainReducer},
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: false,
        })
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
