import { createSlice } from '@reduxjs/toolkit';

// Display name mapping for specific users
const displayNameMap = {
  'office@pediatricsofsugarland.com': 'Pediatrics of Sugar Land',
  'netatworld@gmail.com': 'Pediatrics Houston, PA'
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      // This prevents potential issues with object mutations
      const userData = JSON.parse(JSON.stringify(action.payload));
      
      // Apply display name mapping if user email matches
      if (userData && userData.emailAddress && displayNameMap[userData.emailAddress]) {
        userData.displayName = displayNameMap[userData.emailAddress];
      }
      
      state.user = userData;
      state.isAuthenticated = !!action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        // Update specific fields in the user object
        const updates = action.payload;
        state.user = {
          ...state.user,
          ...updates
        };
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;