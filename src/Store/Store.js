import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Slice"

const store = configureStore({
    reducer:{
        expense: expenseReducer
    }
})

export default store