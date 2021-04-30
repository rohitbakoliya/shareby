import axios from 'axios';

const httpInstance = axios.create({
  timeout: 3000,
});

httpInstance.interceptors.response.use(undefined, error => {
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response.data.error);
});
export { httpInstance as http };
