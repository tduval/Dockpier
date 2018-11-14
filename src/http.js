import axios from 'axios';

const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_PROTOCOL}${process.env.VUE_APP_API_BASE_URL}:${process.env.VUE_APP_API_BASE_PORT}`,
  // timeout: 1000,
  // headers: {
  //   'X-Custom-Header': 'foobar',
  // },
});

export default HTTP;
