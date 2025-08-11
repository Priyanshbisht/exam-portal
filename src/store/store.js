// store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice.js';
// import courseReducer from '../features/course/courseSlice.js'
// import labReducer from '../features/lab/labSlice.js'
// import profileReducer from '../features/profile/profileSlice.js'

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        // course: courseReducer,
        // lab: labReducer,
        // profile: profileReducer
    },
});

