// api.js
import Axios from 'axios';

const BASE_URL = 'https://hilltopkit.com/api'; // Set your base URL here

export async function makeApiCall(endpoint, data) {
  try {
    const apiUrl = `${BASE_URL}/${endpoint}`;
    const response = await Axios.get(apiUrl, { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
}
