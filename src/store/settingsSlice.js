import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    facilityName: "Healthcare Facility",
    lowStockThreshold: 5,
    expirationWarningDays: 30,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    reportingFrequency: "monthly"
  },
  loading: false,
  error: null
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateSettings: (state, action) => {
      state.settings = {
        ...state.settings,
        ...action.payload
      };
      state.loading = false;
      state.error = null;
    },
    updateSingleSetting: (state, action) => {
      const { field, value } = action.payload;
      state.settings[field] = value;
    },
    resetSettings: (state) => {
      state.settings = {
        facilityName: "Healthcare Facility",
        lowStockThreshold: 5,
        expirationWarningDays: 30,
        autoBackup: true,
        emailNotifications: true,
        smsNotifications: false,
        reportingFrequency: "monthly"
      };
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { 
  setLoading, 
  updateSettings, 
  updateSingleSetting, 
  resetSettings, 
  setError 
} = settingsSlice.actions;

export default settingsSlice.reducer;