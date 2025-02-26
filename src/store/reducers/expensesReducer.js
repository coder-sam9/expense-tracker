    import { createSlice } from "@reduxjs/toolkit";

const expenses=createSlice({
    name:"expenses",
    initialState:{
        expenses: [],
        totalExpenses: 0,
      },
    reducers:{
        addExpense(state,action){
            state.totalExpenses= state.totalExpenses+action.payload.amount;
            state.expenses.push(action.payload);
        },
        addAllExpenses(state,action){
            state.totalExpenses=action.payload.reduce(((acc,expense)=>{
                    return acc+Number( expense.amount);
            }),0)
            state.expenses= action.payload;
        },
    removeExpense(state,action){
        state.expenses= state.expenses.filter((expense)=>expense.id!==action.payload);
    },
    updateExpense(state,action){
        const oldExpense = state.expenses.find((expense) => expense.id === action.payload.id);

      if (oldExpense) {
        state.totalExpenses -= Number(oldExpense.amount);
        state.totalExpenses += Number(action.payload.amount);
      }

      state.expenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    }
}
});
  export const {addExpense,removeExpense,addAllExpenses,updateExpense}= expenses.actions;
    export default expenses.reducer;