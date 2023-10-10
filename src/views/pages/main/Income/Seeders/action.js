// api.js

import axios from 'axios';

export const fetchPrograms = async (formattedDob) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/programs`, {
      params: {
        'filters[Date][$eq]': formattedDob
      }
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const Tithes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/titheses`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
}

export const searchTithes = async (tithesNumber) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/titheses`, {
      params: {
        'filters[Tithes_Id][$eq]': tithesNumber
      }
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}


export async function insertSeeders(data) {
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/payments`;

  console.log("data",data.Date)
  const requestData = {
    data: {
      Payment_Category: data.PaymentCategory,
      Programe_Date: data.Date,
      Program_Name: data.Programme,
      Tithes_Name: data.PersonName,
      Tithes_Number: data.TithesNumber,
      Tithes_Mobile: data.PersonMobile,
      Peyment_Method:  data.PaymentMethod,
      Payment: data.Payment,
      Note: data.Note,
    }
  };

  try {
    const response = await axios.post(apiUrl, requestData);
    // Handle success
    console.log('POST request successful:', response.data);
  } catch (error) {
    // Handle error
    console.error('Error making POST request:', error);
  }
}
