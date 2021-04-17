import axios from 'axios';

const httpInstance = axios.create({
  timeout: 3000,
});

httpInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log(`request cancelled`);
    }
    return Promise.reject(error.response.data.error);
  }
);
export { httpInstance as http };
