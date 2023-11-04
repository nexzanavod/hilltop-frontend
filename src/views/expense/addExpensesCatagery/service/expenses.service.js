import Axios from 'axios';
import { makeApiCall,DeleteApi } from '../../../../common/axiosCall';

export function fetchExpenses() {
    return makeApiCall('expenses-categories?pagination[pageSize]=1000')
      .then(apiData => apiData.data)
      .catch(error => {
        console.error("Error fetching payments data:", error);
        throw error; // You can choose to throw the error or handle it as needed
      });
  }

  export async function deleteCategories(categoryId) {
    try {
      // Use makeApiCall to delete a program
      const data = await DeleteApi(`expenses-categories/${categoryId}`, null); // 'programs' is your API endpoint
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function AddExpensesCategory(data) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/expenses-categories`;
  
    console.log("data",data.Date)
    const requestData = {
      data: {
        Category: data.CategoryName,
        Category_Date: data.Date,
      }
    };
  
    try {
      const response = await Axios.post(apiUrl, requestData);
      // Handle success
      console.log('POST request successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      // Handle error
      console.error('Error making POST request:', error);
      return { success: false, error: error };
    }
  }