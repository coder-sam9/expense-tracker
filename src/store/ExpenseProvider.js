import React, { useEffect, useState } from "react";
import ExpensesContext from "./expenses-context";

function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("expense-user"));
    if (user?.idToken) {
      setIsLogin(true);
      setUserInfo(user);
    }
  }, []);

  // Function to update user info
  const addUserInfo = (user) => {
    setUserInfo(user);
  };

  // Function to update login status
  const changeLoginStatus = (status) => {
    setIsLogin(status);
  };

  const contextValue = {
    expenses,
    isLogin,
    userInfo,
    addUserInfo,
    changeLoginStatus,
    setExpenses, // Provide this in case expense updates are needed elsewhere
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseProvider;
