import { useState } from "react";
import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import "./index.css";

function App() {
  const [showAddExpense, setShowAddExpense] = useState(true);
  return (
    <div>
      <Navbar />

      {showAddExpense && <AddExpense />}

      <Stats />
    </div>
  );
}

export default App;
