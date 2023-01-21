import { configureStore } from "@reduxjs/toolkit";

import authReducers from './auth'
import sentSlice from './SentBox'
import mailSlice from './Mail'

const store = configureStore({
    reducer:{
        authh : authReducers,
        sent : sentSlice,
        mails : mailSlice
    }
}
)
export default store ;