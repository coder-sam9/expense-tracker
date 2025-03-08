import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginScreen from "./pages/Login/LoginScreen";
import WelcomeScreen from "./pages/welcome/WelcomeScreen";
import { useContext, useEffect, useState } from "react";
import ExpensesScreen from "./pages/Expense/ExpensesScreen";
import {login} from './store/slices/AuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "./store/ThemeProvider";
import Greetings from "./components/Greetings";
import { fetchExpenses, fetchUserPremiumStatusThunk } from "./store/slices/expensesSlice";
import Loader from "./components/UI/Loader";

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
  const [loading,setLoading]=useState(false);
const {isAuthenticated,user}=useSelector(state=>state.authentication)
const dispatch=useDispatch();
  // const [isLoggedIn,setIsLoggedIn]=useState(false);
   useEffect(()=>{
    const initializeData = async () => {
      setLoading(true);
    console.log(userData);
    if(userData?.idToken!==undefined){
      // setIsLoggedIn(true)
     await dispatch(login(userData)).unwrap()
     await dispatch(fetchUserPremiumStatusThunk()).unwrap()
     await dispatch(fetchExpenses()).unwrap()
    }
    setLoading(false);
  }
  },[])
  if (loading) {
    return <Loader/>
    
  }
  return (
    <ThemeProvider> 
      <Router basename="/expense-tracker">
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
          </ThemeProvider>
  );
}

export default App;
