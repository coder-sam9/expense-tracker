import React, { useEffect, useState } from "react";
import CustomInput from "../../components/UI/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import styles from "./ExpensesScreen.module.css"; // Optional: Add CSS for styling
import AddExpenseForm from "../../components/Layout/AddExpenseForm";
import ExpenseItem from "../../components/Layout/ExpenseItem";
import { addExpense, getExpenses } from "../../apis/expenseCalls";

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

const fetchExpenses=async () => {
  try{
  const response=await getExpenses();
  console.log("in the fetche xpenses call",response);
  setExpenses(()=>{
    const transformedResponse=
    Object.keys(response).map((key)=>{
const obj={
  id:key,
  ...response[key]
}
return obj;
    })
    return transformedResponse;
  })
  }
  catch(error){
    console.error(error);
    
  }
}
useEffect(()=>{
  fetchExpenses()
},[])
    // Handler for form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  try {
    
      // Validate inputs
      if (!expense.amount || !expense.description || !expense.category) {
          alert("Please fill all fields.");
          return;
      }
  
      // Log the expense (replace with API call)
      const resposne = await addExpense(expense.category,expense.amount,expense.description);
      if(resposne.ok){
        fetchExpenses()
      }
      console.log(resposne);
  
      // Clear the form
      setExpense({
          amount: "",
          description: "",
          category: "Food",
      });
      
  } catch (error) {
   console.error(error);
    
  }
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
    <div className={styles.container} style={{marginTop:20,backgroundColor:'whitesmoke'}}>
      <h3>
        Your Expenses
      </h3>
    <div className={styles.expensesList}>
    {expenses.map((expense, index) => (
        <ExpenseItem key={index} expense={expense} />
    ))}
</div>
      </div>
        </div>
    );
}

export default ExpensesScreen;