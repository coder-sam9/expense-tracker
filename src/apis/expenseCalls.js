import axios from "axios";

const userData=JSON.parse(localStorage.getItem('expense-user'));
console.log('user Data',userData);


const url=`https://expensetracker-cae41-default-rtdb.firebaseio.com/`;
const formatEmailForFirebase = (email) => {
  return email.replace(/\./g, 'dot').replace(/@/g, '_at_');
};
export const getUserDataApi = async (email) => {
  const response = await axios.get(`${url}/${formatEmailForFirebase(email)}.json`);
  return response.data;
};
export const initializeUserApi = async (email) => {
  try {
    const response = await axios.put(
      `${url}${formatEmailForFirebase(email)}.json`,
      {
        premiumActivated: false,
        expenses: {}            
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error initializing user:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const updatePremiumApi = async (email,newStatus, expenses) => {
  console.log("in the update premium api",email);
  
  try {
    const updatedData = {
      premiumActivated:newStatus , // true or false
      // expenses: expenses, // Preserve existing expenses
    };

    const response = await axios.put(
      `${url}${formatEmailForFirebase(email)}.json`,
      updatedData,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.premiumActivated; // Return updated premium status
  } catch (error) {
    console.error("Error updating premium status:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const addExpenseApi = async (email,category, amount,description) => {
  try {
    const data={
        category:category,
        amount:amount,
        description:description
    }
    const response = await axios.post(url+formatEmailForFirebase(email)+':expenses.json', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    console.error('Error Adding expense:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const getExpensesApi = async (email) => {
  try {
    console.log("in the get call");
    
    const response = await axios.get(url+formatEmailForFirebase(email)+':expenses.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response from getExpenseApi",response);
      
    return response.data;
  } catch (error) {
    console.error('Error get expenses:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const updateExpenseApi = async (email,id,category, amount,description) => {
  try {
    console.log("in the update call");
    const data={
        category:category,
        amount:amount,
        description:description
    }
    const response = await axios.put(url+formatEmailForFirebase(email)+':expenses/'+id+'.json',data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    console.error('Error update expense:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const deleteExpenseApi = async (email,id) => {
  try {
    console.log("in the delete call");
    
    const response = await axios.delete(url+formatEmailForFirebase(email)+':expenses/'+id+'.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    console.error('Error delete expenses:', error.response ? error.response.data : error.message);
    throw error;
  }
};