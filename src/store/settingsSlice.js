import { createSlice } from '@reduxjs/toolkit';

// Helper function to load settings from localStorage
const loadSettingsFromStorage = () => {
  try {
    const savedSettings = localStorage.getItem('vaxtrack-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
  }
  
  // Return default settings if no saved settings or error occurred
  return {
    facilityName: "Healthcare Facility",
    lowStockThreshold: 5,
    expirationWarningDays: 30,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    reportingFrequency: "monthly"
  };
};

const initialState = {
  settings: loadSettingsFromStorage(),
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
      
      // Save to localStorage
      try {
        localStorage.setItem('vaxtrack-settings', JSON.stringify(state.settings));
      } catch (error) {
        console.error('Error saving settings to localStorage:', error);
      }
    },
    updateSingleSetting: (state, action) => {
      const { field, value } = action.payload;
      state.settings[field] = value;
      
      // Save to localStorage immediately when a single setting is updated
      try {
        localStorage.setItem('vaxtrack-settings', JSON.stringify(state.settings));
      } catch (error) {
        console.error('Error saving settings to localStorage:', error);
      }
    },
    resetSettings: (state) => {
      const defaultSettings = {
        facilityName: "Healthcare Facility",
        lowStockThreshold: 5,
        expirationWarningDays: 30,
        autoBackup: true,
        emailNotifications: true,
        smsNotifications: false,
        reportingFrequency: "monthly"
      };
      
      state.settings = defaultSettings;
      state.loading = false;
      state.error = null;
      
      // Clear localStorage and save default settings
      try {
        localStorage.setItem('vaxtrack-settings', JSON.stringify(defaultSettings));
      } catch (error) {
        console.error('Error saving default settings to localStorage:', error);
      }
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