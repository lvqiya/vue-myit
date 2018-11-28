import axios from 'axios'
import Vue from 'vue';
const MyHttpServer = {}
MyHttpServer.install = (vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    // console.log(config);
    if (config.url !== 'login') {
      const token = localStorage.getItem('token')
      config.headers.Authorization = token
    }
    // 在发送请求之前做些什么

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  Vue.prototype.$http = axios
}
export default MyHttpServer
