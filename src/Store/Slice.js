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
      const { id, type, amount, desc } = action.payload;

      if (type === "logout") {
        state.expensesList = [];
        state.incomes = 0;
        state.expenses = 0;
        return;
      }

      const exists = state.expensesList.some((item) => item.id === id);
      if (exists) return;

      state.expensesList.push({ id, type, amount, desc });

      if (type === "income") {
        state.incomes += amount;
      } else if (type === "expense") {
        state.expenses += amount;
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
