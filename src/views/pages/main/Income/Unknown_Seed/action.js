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



export async function addUnknownSeed(data) {
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/payments`;

  console.log("data",data.Date)
  const requestData = {
    data: {
      Payment_Category: data.PaymentCategory,
      Programe_Date: data.Date,
      Add_Unknown:data.Add_Unknown,
      Program_Name: data.Programme,
      Person_Name: data.PersonName,
      Person_Mobile: data.PersonMobile,
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
