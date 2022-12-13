import { createSlice } from "@reduxjs/toolkit";

const initValue = { showmainPage:false,
isAuth : false }

const authSlice = createSlice({
    name: 'Authentication',
    initialState: initValue,
    reducers:{
        mainPage(state){
            state.showmainPage=true
        },
        checker(state){
            const localIsLogin = localStorage.getItem('JWTTOKEN');
        if(localIsLogin ===null){
            state.isAuth = false;
        }else if(localIsLogin === ''){
            state.isAuth =false;
        }else if(localIsLogin.trim().length > 0){
            state.isAuth = true;
        }
        }
    }
})

export const {mainPage , checker} = authSlice.actions;

export default authSlice.reducer;