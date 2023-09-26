// reducers.js
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_IMAGE_URL } from "@env"

const initialState = {
  profileUrl: DEFAULT_IMAGE_URL,
  refresh_token: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    login: (state, action) => {
      state.profileUrl = action.payload.profileUrl;
    },
    logout: (state) => {
      state.profileUrl = DEFAULT_IMAGE_URL;
    },
    refreshToken: (state) =>{
        state.refresh_token = action.payload.refresh_token
    }
  },
});

export const { login, logout, refreshToken } = profileSlice.actions;
export default profileSlice.reducer;


// import { DEFAULT_IMAGE_URL } from "@env"

// const initialState = {
//     profileUrl: DEFAULT_IMAGE_URL
// };
   
// export default (state = initialState, action) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return {
//           ...state,
//           profileUrl: action.payload.profileUrl,
//         };
//       case 'LOGOUT':
//         return {
//           ...state,
//            profileUrl: DEFAULT_IMAGE_URL,
//         };
//       default:
//         return state;
//     }
// };