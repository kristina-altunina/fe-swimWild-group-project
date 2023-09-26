import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your rootReducer here

const store = configureStore({
  reducer: rootReducer,
  // You can also configure middleware, dev tools, and other options here if needed
});

console.log("STORE", store)
export default store;