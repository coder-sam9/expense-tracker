import React, { useContext,useEffect } from 'react'
import CustomInput from '../UI/CustomInput'
import CustomButton from '../UI/CustomButton'
import styles from './AddExpense.module.css'
import { ThemeContext } from '../../store/ThemeProvider';


function AddExpenseForm({ onSubmit, onChange, expense,showPremium }) {
    useEffect(() => {dispatch({ type: "TOGGLE_THEME" })
    
      
    }, [showPremium])
    
    const { theme, dispatch } = useContext(ThemeContext);
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
      
                {showPremium ? (
                    <CustomButton type="submit" title={'Add Expense'} />
                ) : (
                    <CustomButton type="submit" title={'Activate Premium'} />
                )}
      
              {showPremium &&  <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
                    Toggle Theme
                </button>}
            </form>

      
  );
}

export default AddExpenseForm