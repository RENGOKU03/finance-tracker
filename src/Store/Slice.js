import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addExpense: false,
  expensesList: [],
  totalExpense: 0,
  totalIncome: 0,
  totalBalance: 0,
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
    },
  },
});

export const { addTransaction, trueAddTransaction, falseAddTransaction } =
  expenseSlice.actions;
export default expenseSlice.reducer;
