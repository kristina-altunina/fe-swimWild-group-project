// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileUrl: '',
  refresh_token: '',
  name:'',
  loggedIn: false,
  uid: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    login: (state, action) => {
      state.profileUrl = action.payload.profileUrl;
      state.name = action.payload.name;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.profileUrl = '';
      state.refresh_token = '';
      state.name = '';
      state.loggedIn = false;
      state.uid = ''
    },
    refreshToken: (state, action) =>{
        state.refresh_token = action.payload.refresh_token
    },
    userId:(state, action) =>{
      state.uid = action.payload.uid
    }
  }
});

export const { login, logout, refreshToken, userId } = profileSlice.actions;
export default profileSlice.reducer;
