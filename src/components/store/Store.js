import { configureStore } from "@reduxjs/toolkit";

import authReducers from './auth'
import sentSlice from './SentBox'

const store = configureStore({
    reducer:{
        authh : authReducers,
        sent : sentSlice
    }
}
)
export default store ;