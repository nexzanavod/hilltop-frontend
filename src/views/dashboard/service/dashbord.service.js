

// Define an Axios function for the API call
import { makeApiCall } from '../../../common/axiosCall';

export function fetchPayments() {
  return makeApiCall('payments')
    .then(apiData => apiData.data)
    .catch(error => {
      console.error("Error fetching payments data:", error);
      throw error; // You can choose to throw the error or handle it as needed
    });
}

export function fetchProgram() {
    return makeApiCall('programs')
      .then(apiData => apiData.data)
      .catch(error => {
        console.error("Error fetching payments data:", error);
        throw error; // You can choose to throw the error or handle it as needed
      });
  }
