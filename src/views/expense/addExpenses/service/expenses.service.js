import axios from 'axios';
import { makeApiCall,DeleteApi } from '../../../../common/axiosCall';

export function fetchExpenses() {
    return makeApiCall('expenses-categories?pagination[pageSize]=1000')
      .then(apiData => apiData.data)
      .catch(error => {
        console.error("Error fetching payments data:", error);
        throw error; // You can choose to throw the error or handle it as needed
      });
  }


  export async function insertExpenses(data) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/expenses`;
  
    console.log("data",data.Date)
    const requestData = {
      data: {
        Date: data.Date,
        ExpensesCategory: data.ExpensesCategory,
        PaymentMethod:  data.PaymentMethod,
        Payment: data.Payment,
        Note: data.Note,
      }
    };
  
    try {
      const response = await axios.post(apiUrl, requestData);
      // Handle success
      console.log('POST request successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      // Handle error
      console.error('Error making POST request:', error);
      return { success: false, error: error };
    }
  }

