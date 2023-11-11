import { makeApiCall } from '../../../../../../common/axiosCall'; // Adjust the path as needed

export async function generateReports(data,pageSize = 1000) {
  const startDate = data.startDate;
  const endDate = data.endDate;
  const ExpencesCategory = data.ExpencesCategory;

  console.log("LLLLLLLLLLLLL",startDate,endDate,ExpencesCategory)

  const endpoint = 'expenses';
  const queryParams = {
    filters: {
      $and: [
        { Date: { $gte: startDate } },
        { Date: { $lte: endDate } },
      ]
    },
    pagination: {
      pageSize: pageSize
    }
  };
  if (ExpencesCategory !== "All") {
    queryParams.filters.$and.push({ ExpensesCategory: { $eq: ExpencesCategory } });
  }
  try {
    const reportData = await makeApiCall(endpoint, queryParams);
    console.log("Data:", reportData);
    return reportData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

