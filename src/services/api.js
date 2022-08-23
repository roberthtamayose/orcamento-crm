import axios from "axios";

axios.defaults.baseURL = 'http://10.111.70.10:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiQFBYNzQ1YXAifQ.Vf9LGTOICbV261atWKElPUMPoAB7zha3tgwq-Jd0PCw';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
    baseURL: 'http://10.111.70.10:8000',
   
});
api.defaults.headers["Access-Control-Allow-Origin"] = "*";
api.defaults.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,DELETE,PUT";


export default api;