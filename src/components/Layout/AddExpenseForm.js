import React from 'react'
import CustomInput from '../UI/CustomInput'
import CustomButton from '../UI/CustomButton'
import styles from './AddExpense.module.css'

function AddExpenseForm({ onSubmit, onChange, expense }) {
  return (
      <form onSubmit={onSubmit} className={styles.form}>
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
                  className={styles.dropdown}
              >
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
              </select>
          </div>

          <CustomButton type="submit" title={'Add Expense'}/>
      </form>
  );
}

export default AddExpenseForm