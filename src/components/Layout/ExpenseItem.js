import React from 'react';
import styles from './ExpenseItem.module.css'
function ExpenseItem({ expense }) {
    return (
        <div className={styles.expenseItem}>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Description:</strong> {expense.description}</p>
            <p><strong>Category:</strong> {expense.category}</p>
        </div>
    );
}

export default ExpenseItem