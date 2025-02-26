import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/UI/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import styles from "./ExpensesScreen.module.css"; // Optional: Add CSS for styling
import AddExpenseForm from "../../components/Layout/AddExpenseForm";
import ExpenseItem from "../../components/Layout/ExpenseItem";
import {
  addExpenseApi,
  getExpensesApi,
  updateExpenseApi,
  deleteExpenseApi,
} from "../../apis/expenseCalls";
import {
  addAllExpenses,
  addExpense as addExpenseReducer,
  removeExpense as removeExpenseReducer,
  updateExpense
} from "../../store/slices/expensesSlice";
import { useSelector,useDispatch } from "react-redux";
import { ThemeContext } from "../../store/ThemeProvider";

const ExpensesScreen=()=> {
  // State to manage form inputs
  
  const { theme, dispatch } = useContext(ThemeContext);
const {totalExpenses,expenses}=useSelector(state=>state.expenses);
const dispath=useDispatch();
  const [expense, setExpense] = useState({
    id: "",
    amount: "",
    description: "",
    category: "Food", // Default category
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchExpenses = async () => {
    try {
      const response = await getExpensesApi();
      console.log("in the fetche xpenses call", response);
      const transformedResponse = Object.keys(response ? response : {}).map(
        (key) => {
          const obj = {
            id: key,
            ...response[key],
          };

          return obj;
        }
      );
      dispath(addAllExpenses(transformedResponse));
    } catch (error) {
      console.error(error);
    }
  };
  const editExpense = async (item) => {
    setExpense(item);
    setIsEdit(true);
    
  };
  const updateExpenseCall=async()=>{
    try {
      
      const response = await updateExpenseApi(
        expense.id,
        expense.category,
        expense.amount,
        expense.description
      );
      dispath(updateExpense(response))
      console.log("update epense call", response);
      // Clear the form
      setExpense({
        amount: "",
        description: "",
        category: "Food",
      });
      fetchExpenses();
    } catch (error) {
      console.error(error);
      
    }
    }
  const removeExpense = async (id) => {
    try {
      const response = await deleteExpenseApi(id);
      console.log("delete response call", response);
      dispath(removeExpenseReducer(id));

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate inputs
      if (!expense.amount || !expense.description || !expense.category) {
        alert("Please fill all fields.");
        return;
      }
      if (Number(totalExpenses)+Number(expense.amount)>10000) {
        alert(`Your expenses will increase the 10000 threshold,Please add go for premium ${totalExpenses+expense.amount}`);
      }
      if (isEdit) {
        updateExpenseCall()
        return;
      }
      // Log the expense (replace with API call)
      const resposne = await addExpenseApi(
        expense.category,
        expense.amount,
        expense.description
      );
      if (resposne.ok) {
        dispath(addExpenseReducer(resposne))
        fetchExpenses();
      }
      console.log("add expense call", resposne);

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
      <div className={`${styles.screen} ${theme === "dark" ? styles.dark : styles.light}`}>
        <div className={styles.container}>
          <h1>Add Expense</h1>
          <AddExpenseForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            expense={expense}
            showPremium={totalExpenses>=10000}
          />
        </div>
        <div
          className={`${styles.container} ${theme === "dark" ? styles.darkContainer : ""}`}
        >
          <h3>Your Expenses</h3>
          <h3>Total Expenses: <span>{totalExpenses}</span> </h3>
          <div className={styles.expensesList}>
            {expenses.map((expense, index) => (
              <ExpenseItem
                key={index}
                expense={expense}
                onEdit={editExpense}
                onDelete={removeExpense}
              />
            ))}
          </div>
        </div>
      </div>

  
  );
}

export default ExpensesScreen;
