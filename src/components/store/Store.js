import { configureStore } from "@reduxjs/toolkit";

import authSlice from './auth'

const store = configureStore({
    reducer:{
        authh : authSlice,
    }
}
)
export default store ;