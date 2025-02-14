import { createContext } from "react";

const ExpensesContext=createContext({
    expenses:[],
    isLogin:false,
    userInfo:{},
    addUserInfo:()=>{},
    changeLoginStatus:()=>{}

})
export default ExpensesContext;