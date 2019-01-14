import axios from 'axios';

export default{
    address: {
        search: "35.233.177.20:8081",
        booking: "35.247.27.154:8082",
        recommendation: "35.197.32.162:8085"
    },
    local: {
        search: "localhost:8081",
        booking: "localhost:8082",
        recommendation: "localhost:8085"
    },
    get: function (service, endpoint){
        var port = this.address[service];
        if(window.location.href.startsWith("http://localhost")){
            port = this.local[service];
        }
        return axios.get(`http://${port}/v1/${endpoint}`, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    },
    post: function (service, endpoint, data){
        var port = this.address[service];
        if(window.location.href.startsWith("http://localhost")){
            port = this.local[service];
        }
        return axios.post(`http://${port}/v1/${endpoint}`, data, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    },
    health: function (service){
        var port = this.address[service];
        if(window.location.href.startsWith("http://localhost")){
            port = this.local[service];
        }
        return axios.get(`http://${port}/v1/health`, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    }
};
