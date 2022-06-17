import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = 'Bearer ' + (!token ? 'logged_out' : token);

  return config;
});

axios.interceptors.response.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = 'Bearer ' + (!token ? 'logged_out' : token);

  return config;
});

// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // if (error?.response?.data?.message == 'jwt_error') {
//     //   window.localStorage.setItem('jwt', JSON.stringify('logged_out'));
//     //   window.localStorage.setItem('tokens', JSON.stringify({}));
//     //   window.localStorage.setItem('user', JSON.stringify(null));
//     // }
//     return Promise.reject(error);
//   }
// );
export default axios;
