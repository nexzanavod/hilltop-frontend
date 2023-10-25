import { makeApiCall } from '../../../../../../common/axiosCall'; // Adjust the path as needed

export async function generateReports(data,pageSize = 1000) {
  const startDate = data.startDate;
  const endDate = data.endDate;
  const programCategory = data.programCategory;

  const endpoint = 'payments';
  const queryParams = {
    filters: {
      $and: [
        { Programe_Date: { $gte: startDate } },
        { Programe_Date: { $lte: endDate } },
      ]
    },
    pagination: {
      pageSize: pageSize
    }
  };
  if (programCategory !== "All") {
    queryParams.filters.$and.push({ Payment_Category: { $eq: programCategory } });
  }
  try {
    const reportData = await makeApiCall(endpoint, queryParams);
    console.log("Data:", reportData);
    return reportData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

