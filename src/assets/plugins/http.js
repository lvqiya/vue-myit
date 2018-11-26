import axios from 'axios'
import Vue from 'vue';
const MyHttpServer = {}
MyHttpServer.install = (vue)=>{
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    Vue.prototype.$http = axios
}
export default MyHttpServer