import axios from 'axios';

//   baseURL: 'http://localhost:8080/api',
export const api = axios.create({
  baseURL: 'http://192.168.0.2:8080/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }

    // if (error.response?.status === 401) {
    //   window.location.href = '/sign-in';
    // }
    return Promise.reject(error);
  }
);
