import { createSlice } from "@reduxjs/toolkit";

const authenticate=createSlice({
    name:"authenticate",
    initialState:{
        isAuthenticated: false,
        user: {},
    },
    reducers:{
        login(state,action){
            state.isAuthenticated= true;
            state.user= action.payload;
        },
        logout(state){
            state.isAuthenticated= false;
            state.user= {};
        }
    }
});
export const {login,logout}= authenticate.actions;
export default authenticate.reducer;