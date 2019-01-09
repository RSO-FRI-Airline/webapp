import axios from 'axios';

export default{
    searchPort: "35.233.177.20:8081",
    bookingPort: "35.247.27.154:8082",
    get: function (service, endpoint){
        var port = this.searchPort;
        if(service == "booking"){
            port = this.bookingPort;
        }
        return axios.get(`http://${port}/v1/${endpoint}`, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    },
    post: function (service, endpoint, data){
        var port = this.searchPort;
        if(service == "booking"){
            port = this.bookingPort;
        }
        return axios.post(`http://${port}/v1/${endpoint}`, data, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    }
};
