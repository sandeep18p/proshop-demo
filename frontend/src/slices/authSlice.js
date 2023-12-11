// In this particular file we are not dealing with any endpoints or apiStuffs and all thosa will go to another endpoitn eich is userApiSlice  
// video
// this is made to set the user credential and remove them

import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
} 


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state,action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
          },
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;