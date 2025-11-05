// import axios from 'axios';

// const API_URL = '/api';
// //const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


// export const getData = async (filters = {}) => {
//   try {
//     const params = new URLSearchParams();
    
//     Object.keys(filters).forEach(key => {
//       if (filters[key] && filters[key] !== '') {
//         params.append(key, filters[key]);
//       }
//     });

//     const response = await axios.get(`${API_URL}/data?${params.toString()}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// export const getFilterOptions = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/filters`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching filter options:', error);
//     throw error;
//   }
// };

// export const getStats = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/stats`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     throw error;
//   }
// };











import axios from 'axios';

// ✅ With proxy, this will automatically hit http://localhost:5000/api
const API_URL = '/api';

export const getData = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });

    const response = await axios.get(`${API_URL}/data?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getFilterOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/filters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
