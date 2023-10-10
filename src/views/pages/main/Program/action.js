import Axios from 'axios';

export const fetchPrograms = async () => {
  try {
    const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/programs?sort=Date:DESC`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export async function AddPrograms(data) {
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/programs`;

  console.log("data",data.Date)
  const requestData = {
    data: {
      Name: data.Programme,
      Date: data.Date,
      Day:data.ProgramDay,
      Men_Count: data.MenCount,
      Women_Count: data.WomenCount,
      Children_Count: data.ChildrenCount,
    }
  };

  try {
    const response = await Axios.post(apiUrl, requestData);
    // Handle success
    console.log('POST request successful:', response.data);
  } catch (error) {
    // Handle error
    console.error('Error making POST request:', error);
  }
}