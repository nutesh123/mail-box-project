import { createSlice } from "@reduxjs/toolkit";

const initValue = { 
    mailcount : '' ,
    maildata : {},
mailopen: false }
    
    const mailSlice = createSlice({
        name: 'mailfunctions',
        initialState: initValue,
        reducers:{
            mailcount(state , action){
                state.mailcount=action.payload
            },
            maildata (state , action){
                state.maildata = action.payload
            },
           mailopen(state){
state.mailopen = true
            },
            mailclose(state){
                state.mailopen=false
            }
        }
        
    })
    
    export const {mailcount , maildata, mailclose,mailopen } = mailSlice.actions;
    
    export default mailSlice.reducer;