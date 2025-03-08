  import React, { useEffect,useContext,useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    fetchExpenses,
    addExpenseThunk,
    updateExpenseThunk,
    deleteExpenseThunk,
  } from "../../store/slices/expensesSlice";
  import { ThemeContext } from "../../store/ThemeProvider";
  import styles from "./ExpensesScreen.module.css";
  import AddExpenseForm from "../../components/Layout/AddExpenseForm";
  import ExpenseItem from "../../components/Layout/ExpenseItem";
  import Loader from "../../components/UI/Loader";

  const ExpensesScreen = () => {
    const [expense, setExpense] = useState({
      id: "",
      amount: "",
      description: "",
      category: "Food",
    });
    const email=JSON.parse(localStorage.getItem('expense-user'))?.email || '';
    
    const [isEdit, setIsEdit] = useState(false);
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [dataLoading,setDataLoading]=useState(false);
    const { expenses, totalExpenses, loading, error } = useSelector(
      (state) => state.expenses
    );
    

    useEffect(() => {
      const fetchingExpenses = async () => {
        try { 
          setDataLoading(true);
          await dispatch(fetchExpenses(email)).unwrap();}
        catch (error) {
          console.error(error);
        } finally {
          setDataLoading(false);
        }
    };
      fetchingExpenses();
  }
    , []);
    if (dataLoading) {
      return <Loader  />;
    }

    const handleAddExpense = (expenseData) => {
      console.log("email nd expenseData in handleAddExpense",email,expenseData);
      
      dispatch(addExpenseThunk({email,expenseData}));
    };

    const handleUpdateExpense = (expenseData) => {
      dispatch(updateExpenseThunk({email,expenseData}));
    };

    const handleDeleteExpense = (id) => {
      dispatch(deleteExpenseThunk({email,id}));
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setExpense((prev) => ({ ...prev, [name]: value }));
    };
    const editExpense = (item) => {
      setExpense(item);
      setIsEdit(true);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    try {
      if (isEdit) {
        handleUpdateExpense(expense);
      } else {
        handleAddExpense(expense);
      }
      setExpense({
        id: "",
        amount: "",
        description: "",
        category: "Food",
      });
      setIsEdit(false);
      
    } catch (error) {
      console.error(error);
    }
    }


    return (
      <div className={`${styles.screen} ${theme === "dark" ? styles.dark : styles.light}`}>
          <div className={styles.container}>
            <h1>Add Expense</h1>
            <AddExpenseForm
              onSubmit={handleSubmit}
              onChange={handleChange}
              expense={expense}
            />
          </div>
          <div
            className={`${styles.container} ${theme === "dark" ? styles.darkContainer : ""}`}
          >
            <h3>Your Expenses</h3>
            <h3>Total Expenses: <span>{totalExpenses}</span> </h3>
            {loading?<p>Loading...</p>:
            error?<p>{error}</p>:
            // error?<p>Please add expenses</p>:
            <div className={styles.expensesList}>
              {expenses.map((expense, index) => (
                <ExpenseItem
                  key={index}
                  expense={expense}
                  onEdit={editExpense}
                  onDelete={handleDeleteExpense}
                />
              ))}
            </div>}
          </div>
        </div>
    );
  };

  export default ExpensesScreen;