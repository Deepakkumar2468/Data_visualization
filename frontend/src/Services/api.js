// // import axios from 'axios';

// // const API_URL = '/api';
// // //const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


// // export const getData = async (filters = {}) => {
// //   try {
// //     const params = new URLSearchParams();
    
// //     Object.keys(filters).forEach(key => {
// //       if (filters[key] && filters[key] !== '') {
// //         params.append(key, filters[key]);
// //       }
// //     });

// //     const response = await axios.get(`${API_URL}/data?${params.toString()}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //     throw error;
// //   }
// // };

// // export const getFilterOptions = async () => {
// //   try {
// //     const response = await axios.get(`${API_URL}/filters`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching filter options:', error);
// //     throw error;
// //   }
// // };

// // export const getStats = async () => {
// //   try {
// //     const response = await axios.get(`${API_URL}/stats`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching stats:', error);
// //     throw error;
// //   }
// // };











// import axios from 'axios';

// // ✅ With proxy, this will automatically hit http://localhost:5000/api
// const API_URL = '/api';

// export const getData = async (filters = {}) => {
//   try {
//     const params = new URLSearchParams();
//     Object.keys(filters).forEach(key => {
//       if (filters[key]) params.append(key, filters[key]);
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

// Base API URL - using proxy, so relative path
const API_URL = '/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging (optional - for debugging)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, '- Status:', response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response received');
    } else {
      // Error in request setup
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch data with optional filters
 * @param {Object} filters - Filter object with keys: end_year, topic, sector, region, pestle, source, swot, country, city
 * @returns {Promise<Array>} Array of data objects
 */
export const getData = async (filters = {}) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    const queryString = params.toString();
    const url = queryString ? `/data?${queryString}` : '/data';
    
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/**
 * Fetch all available filter options
 * @returns {Promise<Object>} Object containing arrays for each filter type
 */
export const getFilterOptions = async () => {
  try {
    const response = await axiosInstance.get('/filters');
    return response.data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    // Return empty options on error
    return {
      endYears: [],
      topics: [],
      sectors: [],
      regions: [],
      pestles: [],
      sources: [],
      swots: [],
      countries: [],
      cities: []
    };
  }
};

/**
 * Fetch statistical data
 * @returns {Promise<Object>} Object containing stats like totalRecords, avgIntensity, etc.
 */
export const getStats = async () => {
  try {
    const response = await axiosInstance.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return default stats on error
    return {
      totalRecords: 0,
      avgIntensity: 0,
      avgLikelihood: 0,
      avgRelevance: 0
    };
  }
};

/**
 * Health check - Test if API is running
 * @returns {Promise<Object>} API status message
 */
export const healthCheck = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return response.data;
  } catch (error) {
    console.error('API Health Check Failed:', error);
    throw error;
  }
};

// Export axios instance for custom requests if needed
export { axiosInstance };

export default {
  getData,
  getFilterOptions,
  getStats,
  healthCheck
};