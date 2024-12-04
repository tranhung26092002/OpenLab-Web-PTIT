import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer/UserReducer";
import ReportReducer from "./ReportReducer/ReportReducer";


export const store = configureStore({
    reducer: {
        UserReducer,
        ReportReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch