import { createSlice } from "@reduxjs/toolkit";

const initValue = { 
    sentBox : false ,
inbox : true }
    
    const sentSlice = createSlice({
        name: 'sentBoxAuthentication',
        initialState: initValue,
        reducers:{
            SentPage(state){
                state.sentBox=true
            },
            SentPageClose(state){
                state.sentBox=false
            },
            inboxPage(state){
                state.inbox=true
            },
            inboxPageClose(state){
                state.inbox=false
            }
        }
        
    })
    
    export const {SentPage , SentPageClose , inboxPage , inboxPageClose} = sentSlice.actions;
    
    export default sentSlice.reducer;