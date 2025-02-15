import React from 'react';
import styles from './ExpenseItem.module.css'
import CustomButton from '../UI/CustomButton';
function ExpenseItem({ expense,onEdit,onDelete }) {
    return (
        <div className={styles.expenseItem}>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Description:</strong> {expense.description}</p>
            <p><strong>Category:</strong> {expense.category}</p>
            <div style={{display:'flex',justifyContent:"space-around",alignItems:'center',flexDirection:'row'}}>
                <CustomButton title='Edit' onClick={()=>onEdit(expense)} type={'button'} style={{width:'70px'}} />
                <button
                            type='button'
                            className={styles.deleteButton}
                            onClick={()=>onDelete(expense.id)}
                        >
                            Delete
                        </button>

            </div>
        </div>
    );
}

export default ExpenseItem