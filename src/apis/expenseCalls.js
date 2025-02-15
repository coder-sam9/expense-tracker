import axios from "axios";

const url='https://expensetracker-cae41-default-rtdb.firebaseio.com/'

export const addExpense = async (category, amount,description) => {
  try {
    const data={
        category:category,
        amount:amount,
        description:description
    }
    const response = await axios.post(url+':expenses.json', data, {
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
export const getExpenses = async () => {
  try {
    console.log("in the get call");
    
    const response = await axios.get(url+':expenses.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    console.error('Error get expenses:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const updateExpense = async (id,category, amount,description) => {
  try {
    console.log("in the update call");
    const data={
        category:category,
        amount:amount,
        description:description
    }
    const response = await axios.put(url+':expenses/'+id+'.json',data, {
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
export const deleteExpense = async (id) => {
  try {
    console.log("in the delete call");
    
    const response = await axios.delete(url+':expenses/'+id+'.json', {
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