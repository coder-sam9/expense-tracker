import React, { useContext,useEffect } from 'react'
import CustomInput from '../UI/CustomInput'
import CustomButton from '../UI/CustomButton'
import styles from './AddExpense.module.css'
import { ThemeContext } from '../../store/ThemeProvider';
import { useSelector,useDispatch } from 'react-redux';
import {
    activatePremiumThunk,
  } from "../../store/slices/expensesSlice";


function AddExpenseForm({ onSubmit, onChange, expense, }) {
    const {premiumActivated,totalExpenses,expenses}=useSelector(state=>state.expenses);
    
    useEffect(() => {dispatch({ type: "TOGGLE_THEME" })
    
      
    }, [premiumActivated]);
    const dispatchForPremium = useDispatch();
    const activatePremium = () => {
        dispatchForPremium(activatePremiumThunk());}
    
    const { theme, dispatch } = useContext(ThemeContext);
    const downloadCSV = () => {
        // Define CSV Header
        const headers = ["ID", "Amount", "Description", "Category"];
      
        // Map expenses data into rows
        const rows = expenses.map(expense => [
          expense.id,
          expense.amount,
          expense.description,
          expense.category,
        ]);
      
        // Combine headers and rows into a single CSV string
        console.log("rows",rows);
        console.log("headers",headers);
        
        
        const csvContent = [
          headers.join(","),
          ...rows.map(row => row.join(","))
        ].join("\n");
        console.log("csvContent",csvContent);
        
      
        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      
        // Create a download link and trigger the download
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "expenses.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
    return (
            <form onSubmit={onSubmit} className={`${styles.form} ${theme === "dark" ? styles.dark : ""}`}>
                <CustomInput
                    type="number"
                    name="amount"
                    placeholder="Amount Spent"
                    title="Amount Spent"
                    value={expense.amount}
                    onChange={onChange}
                    required
                />
                
                <CustomInput
                    type="text"
                    name="description"
                    placeholder="Description"
                    title="Description"
                    value={expense.description}
                    onChange={onChange}
                    required
                />
      
                <div className={styles.dropdownContainer}>
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        value={expense.category}
                        onChange={onChange}
                        className={`${styles.dropdown} ${theme === "dark" ? styles.darkDropdown : ""}`}
                    >
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
      
                <CustomButton 
    type={premiumActivated || totalExpenses < 10000 ? "submit" : "button"} 
    onClick={premiumActivated || totalExpenses < 10000 ? undefined : () => activatePremium()} 
    title={premiumActivated || totalExpenses < 10000 ? "Add Expense" : "Activate Premium"} 
/>

      
              {premiumActivated &&  <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
                    Toggle Theme
                </button>}
              {  <button onClick={() => downloadCSV()}>
                    Download CSV
                </button>}
            </form>

      
  );
}

export default AddExpenseForm