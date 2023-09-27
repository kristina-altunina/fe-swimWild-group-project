// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileUrl: '',
  refresh_token: '',
  name:'',
  loggedIn: false
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
      state.name = '',
      state.loggedIn = false
    },
    refreshToken: (state, action) =>{
        state.refresh_token = action.payload.refresh_token
        console.log('STORE TOKEN', state.refresh_token)
    }
  }
});

export const { login, logout, refreshToken } = profileSlice.actions;
export default profileSlice.reducer;
