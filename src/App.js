import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginScreen from "./pages/Login/LoginScreen";
import WelcomeScreen from "./pages/welcome/WelcomeScreen";
import { useContext, useEffect, useState } from "react";
import ExpensesContext from "./store/expenses-context";
import ExpensesScreen from "./pages/Expense/ExpensesScreen";
import {login} from './store/reducers/AuthReducer';
import { useDispatch, useSelector } from "react-redux";

// Protected Route Component

const ProtectedRoute=({isLogged})=>{
  if (isLogged) {
   return  <Outlet/>
  } else {
   return <Navigate to="/login" replace />;
  }
}
function App() {
  const userData=JSON.parse(localStorage.getItem('expense-user'));
const {isAuthenticate,user}=useSelector(state=>state.authentication)
const dispath=useDispatch();
  // const [isLoggedIn,setIsLoggedIn]=useState(false);
   useEffect(()=>{
    console.log(userData);
    if(userData?.idToken!==undefined){
      // setIsLoggedIn(true)
      dispath(login(userData))
    }
    
  },[])
  return (
      <Router>
        <div
          style={{
            backgroundImage: "url(/backgroundImage.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            width: "100vw",
          }}
        >
          <Routes>
            <Route path="/login" element={userData?.idToken!==undefined?<Navigate to={'/'}replace/>:<LoginScreen />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute isLogged={!!userData?.idToken} />}>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/expense" element={<ExpensesScreen />} />
            </Route>

            {/* Redirect unknown routes to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
