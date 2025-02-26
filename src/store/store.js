import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './reducers/expensesReducer';
import authenticateReducer from './reducers/AuthReducer';

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        authentication: authenticateReducer
    },
});

export default store;