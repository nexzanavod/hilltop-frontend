import Axios from 'axios';


export const fetchTithes = async (page, pageSize, searchQuery) => {
  try {
    // Define the filter object for the search query
    const filter = searchQuery ? { Name: { $containsi: searchQuery } } : {};

    const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/titheses`, {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort':'Tithes_Id',
        filters: filter,

      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export async function addTithes(data) {
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/titheses`;

  console.log("data", data.Date);
  const requestData = {
    data: {
      Tithes_Id: data.TithesId,
      Name: data.FullName,
      Name_With_Initials: data.NamewithInitials,
      Mobile: data.Mobile,
      Address: data.Address,
      Nearest_Town: data.NearestTown,
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



