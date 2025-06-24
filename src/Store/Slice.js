// Store/Slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addExpense: false,
  expensesList: [],
  incomes: 0,
  expenses: 0,
  loggedUser: false,
  isLoading: false,
  hasError: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    // Toggles the visibility of the "Add Expense" form/modal
    trueAddTransaction: (state) => {
      state.addExpense = true;
    },
    falseAddTransaction: (state) => {
      state.addExpense = false;
    },

    // Adds a single transaction to the list and updates totals
    addTransaction: (state, action) => {
      const { id, type, amount, desc, date } = action.payload; // Including 'time' for display

      // Prevent adding duplicates if an item with the same ID already exists.
      // This is crucial when fetching existing data from Firebase.
      const exists = state.expensesList.some((item) => item.id === id);
      if (exists) return;

      // Add the new transaction
      state.expensesList.push({ id, type, amount, desc, date });

      // Update income/expense totals
      if (type === "income") {
        state.incomes += amount;
      } else if (type === "expense") {
        state.expenses += amount;
      }
    },

    // Sets the user's login status
    addLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },

    // --- New Reducers for UI/UX Feedback ---
    // Sets the loading state (e.g., when fetching data from Firebase)
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Sets an error message if an operation fails
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    // Clears all transactions and resets totals, useful on logout
    clearAllTransactions: (state) => {
      state.expensesList = [];
      state.incomes = 0;
      state.expenses = 0;
    },

    // Deletes a transaction and updates totals
    deleteTransaction: (state, action) => {
      const idToDelete = action.payload;
      const transactionToDelete = state.expensesList.find(
        (transaction) => transaction.id === idToDelete
      );

      if (transactionToDelete) {
        // Adjust income/expense totals
        if (transactionToDelete.type === "income") {
          state.incomes -= transactionToDelete.amount;
        } else if (transactionToDelete.type === "expense") {
          state.expenses -= transactionToDelete.amount;
        }
        // Remove the transaction from the list
        state.expensesList = state.expensesList.filter(
          (transaction) => transaction.id !== idToDelete
        );
      }
    },
  },
});

export const {
  addTransaction,
  trueAddTransaction,
  falseAddTransaction,
  addLoggedUser,
  setLoading,
  setError,
  clearAllTransactions,
  deleteTransaction,
} = expenseSlice.actions;
export default expenseSlice.reducer;
