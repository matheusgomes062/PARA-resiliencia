import axios from 'axios';

// const url = 'http://localhost:3000'; //process.env.VUE_APP_API_BASE_URL
const url = 'https://860d-2804-431-e7ce-1484-7545-8af9-f4a0-f1fb.ngrok.io/';

const axiosInstance = axios.create({
  baseURL: url //colocar o api novamente
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    return axios.post(url + '/jwt-auth/v1/token', body);
  },
  validateToken() {
    return axiosInstance.post(url + '/jwt-auth/v1/token/validate');
  }
};

// export function getCep(cep) {
//   return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
// }
