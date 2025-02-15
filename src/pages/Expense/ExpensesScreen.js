import React, { useState } from "react";
import CustomInput from "../../components/UI/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import styles from "./ExpensesScreen.module.css"; // Optional: Add CSS for styling
import AddExpenseForm from "../../components/Layout/AddExpenseForm";
import ExpenseItem from "../../components/Layout/ExpenseItem";

function ExpensesScreen() {
    // State to manage form inputs
    const [expense, setExpense] = useState({
      amount: "",
      description: "",
      category: "Food", // Default category
  });
  const [expenses, setExpenses] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
        ...prev,
        [name]: value,
    }));
};  

    // Handler for form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate inputs
      if (!expense.amount || !expense.description || !expense.category) {
          alert("Please fill all fields.");
          return;
      }
      
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  
      // Log the expense (replace with API call)
      console.log("Expense Added:", expense);
  
      // Clear the form
      setExpense({
          amount: "",
          description: "",
          category: "Food",
      });
  };

    return (
      <div className={styles.screen}>

        <div className={styles.container}>
            <h1>Add Expense</h1>
            <AddExpenseForm
    onSubmit={handleSubmit}
    onChange={handleChange}
    expense={expense}
/>
    </div>
    <div className={styles.expensesList}>
    {expenses.map((expense, index) => (
        <ExpenseItem key={index} expense={expense} />
    ))}
</div>
        </div>
    );
}

export default ExpensesScreen;