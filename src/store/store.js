import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
import authenticateReducer from './slices/AuthSlice';

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        authentication: authenticateReducer
    },
});

export default store;