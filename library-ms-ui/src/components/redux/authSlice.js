
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: localStorage.getItem('token') || null,
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   isAuthenticated: localStorage.getItem('token') ? true : false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
      
      
      
//       localStorage.setItem('token', action.payload.token);
//       localStorage.setItem('user', JSON.stringify(action.payload.user));
//     },
//     clearCredentials: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;

      
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     },
//   },
// });

// export const { setCredentials, clearCredentials } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;

      // Ensure user is an object with a role property
      const userObject = typeof user === 'string' ? { role: user } : user;

      state.token = token;
      state.user = userObject;
      state.isAuthenticated = true;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userObject));
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
