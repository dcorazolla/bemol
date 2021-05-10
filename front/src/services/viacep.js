import axios from "axios";

const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws/"
});

viacep.interceptors.request.use(async config => {
  config.headers.Accept = `application/json`;
  return config;
});

export default viacep;