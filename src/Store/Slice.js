import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addExpense: false,
  expensesList: [],
  incomes: 0,
  expenses: 0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    trueAddTransaction: (state) => {
      state.addExpense = true;
    },

    falseAddTransaction: (state) => {
      state.addExpense = false;
    },
    addTransaction: (state, action) => {
      state.expensesList.push(action.payload);
      if (action.payload.type === "income") {
        const sum = state.incomes + action.payload.amount;
        state.incomes = sum;
      }
      if (action.payload.type === "expense") {
        const sum = state.expenses + action.payload.amount;
        state.expenses = sum;
      }
    },
  },
});

export const { addTransaction, trueAddTransaction, falseAddTransaction } =
  expenseSlice.actions;
export default expenseSlice.reducer;
