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

const hckHttpInstance = axios.create({
  baseURL: `https://api.hackerearth.com/v4/partner/code-evaluation/submissions`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'client-secret': process.env.HCK_CLIENT_SECRET,
  },
});

hckHttpInstance.interceptors.response.use(undefined, error => {
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response.data.error);
});

export { hckHttpInstance as hckHttp };
