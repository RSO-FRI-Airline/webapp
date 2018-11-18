import axios from 'axios';

export default{
    get: function (endpoint){
        return axios.get(`http://localhost:8081/v1/${endpoint}`, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    },
    post: function (endpoint, data){
        return axios.post(`http://localhost:8081/v1/${endpoint}`, data, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    }
};
