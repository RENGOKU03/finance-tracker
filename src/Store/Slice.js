import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addExpense: false,
  expensesList: [],
  incomes: 0,
  expenses: 0,
  loggedUser: false,
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
      const existingTransaction = state.expensesList.find(
        (transaction) => transaction.id === action.payload.id
      );

      if (existingTransaction) {
        // Skip adding the transaction if it already exists
        return;
      }
      if (action.payload.type === "logout") {
        state.expensesList = [];
        state.incomes = 0;
        state.expenses = 0;
      }
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

    addLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

export const {
  addTransaction,
  trueAddTransaction,
  falseAddTransaction,
  addLoggedUser,
} = expenseSlice.actions;
export default expenseSlice.reducer;
