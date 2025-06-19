import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import ExpensesTab from "./components/ExpensesTab";
import { useSelector } from "react-redux";

function App() {
  const addExpense = useSelector((state) => state.expense.addExpense);

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 font-['Exo_2']">
      <Navbar />
      {addExpense && <AddExpense />}
      <Stats />
      <ExpensesTab />
    </div>
  );
}

export default App;
