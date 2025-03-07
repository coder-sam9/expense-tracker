import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExpenseApi,
  getExpensesApi,
  updateExpenseApi,
  deleteExpenseApi,
  updatePremiumApi,
  getUserDataApi
} from "../../apis/expenseCalls";

export const activatePremiumThunk = createAsyncThunk(
  "expenses/activatePremium",
  async ({email,newStatus}) => { // Get current expenses state
console.log("in the activate premium thunk",email);

    // Call the API to update premium status
    const updatedPremiumStatus = await updatePremiumApi(email,newStatus);
    return updatedPremiumStatus; // Return the updated status
  }
);

export const fetchUserPremiumStatusThunk = createAsyncThunk(
  "expenses/fetchUserPremiumStatus",
  async (email) => {
    // Fetch user data (premium status, total expenses, expenses)
    const data = await getUserDataApi(email);

    return {
      premiumActivated: data?.premiumActivated || false,
    };
  }
);

// Async Thunk for fetching expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (email) => {
    const response = await getExpensesApi(email);
    console.log("in the fetch expenses", response);

    return Object.keys(response || {}).map((key) => ({
      id: key,
      ...response[key],
    }));
  }
);

// Async Thunk for adding an expense
export const addExpenseThunk = createAsyncThunk(
  "expenses/addExpense",
  async ({ email, expenseData }) => {
    console.log("in the add expense thunk", email, expenseData);
    
    const response = await addExpenseApi(
      email,
      expenseData.category,
      expenseData.amount,
      expenseData.description
    );
    const newExpense = {
      id: response.name, // Use the unique ID returned by the backend
      amount: expenseData.amount,
      description: expenseData.description,
      category: expenseData.category,
    };

    return newExpense;
  }
);

// Async Thunk for updating an expense
export const updateExpenseThunk = createAsyncThunk(
  "expenses/updateExpense",
  async ({ email, expenseData }) => {
    const response = await updateExpenseApi(
      email,
      expenseData.id,
      expenseData.category,
      expenseData.amount,
      expenseData.description
    );
    return {
      id: expenseData.id, // Keep the same ID
      category: expenseData.category,
      amount: expenseData.amount,
      description: expenseData.description,
    };
  }
);

// Async Thunk for deleting an expense
export const deleteExpenseThunk = createAsyncThunk(
  "expenses/deleteExpense",
  async ({ email, id }) => {
    await deleteExpenseApi(email, id);
    return id;
  }
);

const initialState = {
  expenses: [],
  totalExpenses: 0,
  premiumActivated: false,
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    updatePremiumActivation(state) {
      state.premiumActivated = true;
    },
    resetState(state) {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPremiumStatusThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPremiumStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.premiumActivated = action.payload.premiumActivated;
      })
      .addCase(fetchUserPremiumStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        console.log("in the fetch expenses", action.payload);

        state.loading = false;
        state.expenses = action.payload;
        const expensesAmount = action.payload.reduce(
          (acc, expense) => acc + Number(expense.amount),
          0
        );
        if (expensesAmount > 10000) {
          state.premiumActivated = true;
        }
        state.totalExpenses = expensesAmount;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Expense
      .addCase(addExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
        state.totalExpenses += Number(action.payload.amount);
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Expense
      .addCase(updateExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseThunk.fulfilled, (state, action) => {
        state.loading = false;
        const oldExpense = state.expenses.find(
          (expense) => expense.id === action.payload.id
        );
        if (oldExpense) {
          state.totalExpenses -= Number(oldExpense.amount);
          state.totalExpenses += Number(action.payload.amount);
        }
        state.expenses = state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        );
      })
      .addCase(updateExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Expense
      .addCase(deleteExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
        state.totalExpenses = state.expenses.reduce(
          (acc, expense) => acc + Number(expense.amount),
          0
        );
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(activatePremiumThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(activatePremiumThunk.fulfilled, (state) => {
        state.loading = false;
        state.premiumActivated = true;  // 🔥 Update Redux state
      })
      .addCase(activatePremiumThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updatePremiumActivation, resetState } = expensesSlice.actions;
export default expensesSlice.reducer;
