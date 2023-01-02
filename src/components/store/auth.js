import { createSlice } from "@reduxjs/toolkit";

const initValue = { 
isAuth : false,
mailboxIsOpen : false }

const authSlice = createSlice({
    name: 'Authentication',
    initialState: initValue,
    reducers:{
        mainPage(state){
            state.isAuth=true
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
        },
        mailBox(state){
            state.mailboxIsOpen= true
        },
        mailBoxed(state){
            state.mailboxIsOpen= false
        }
    }
})

export const {mainPage , checker , mailBox , mailBoxed} = authSlice.actions;

export default authSlice.reducer;