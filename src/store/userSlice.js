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
      
      // Validate user profile to prevent "External User Profile not found" errors
      if (userData && typeof userData === 'object') {
        // Check for required profile fields
        const hasRequiredFields = userData.emailAddress && 
                                 (userData.firstName || userData.name) &&
                                 userData.accounts && 
                                 Array.isArray(userData.accounts) &&
                                 userData.accounts.length > 0;
        
        if (!hasRequiredFields) {
          console.warn('Incomplete user profile detected, maintaining unauthenticated state');
          state.user = null;
          state.isAuthenticated = false;
          return;
        }
        
        // Apply display name mapping if user email matches
        if (userData.emailAddress && displayNameMap[userData.emailAddress]) {
          userData.displayName = displayNameMap[userData.emailAddress];
        }
        
        // Ensure profile has fallback values for missing optional fields
        userData.firstName = userData.firstName || userData.name || 'User';
        userData.lastName = userData.lastName || '';
        
        state.user = userData;
        state.isAuthenticated = true;
      } else {
        // Invalid or null user data
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;