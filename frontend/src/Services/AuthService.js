import axios from 'axios'

const baseURL = 'http://localhost:5001'

export const LoginUser = (data) => {
    try {
        const res  = axios.post(`${baseURL}/login/`, data)
        return res
    } catch (error) {
        console.error(error)
    }
};


export const signupHR = async (userData) => {
    try {
      const res = await axios.post(`${baseURL}/register/hr/`, userData);
      return res.data; // Assuming the response contains the user data or a success message
    } catch (error) {
      console.error('Error in HR signup:', error.response?.data || error.message);
      throw error; // Rethrow the error to be handled by the calling function
    }
  };
  
  // API for Employee registration
  export const signupEmployee = async (userData) => {
    try {
      const res = await axios.post(`${baseURL}/employee/register/`, userData);
      return res.data;
    } catch (error) {
      console.error('Error in Employee signup:', error.response?.data || error.message);
      throw error;
    }
  };
  
  // API for Coach registration
  export const signupCoach = async (userData) => {
    try {
      const res = await axios.post(`${baseURL}/coach/register/`, userData);
      return res.data;
    } catch (error) {
      console.error('Error in Coach signup:', error.response?.data || error.message);
      throw error;
    }
  };


