import axios from 'axios';

export default{
    bookingPort: "30144",
    searchPort: "30599",
    get: function (service, endpoint){
        var port = this.searchPort;
        if(service == "booking"){
            port = this.bookingPort;
        }
        return axios.get(`http://159.122.183.250:${port}/v1/${endpoint}`, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    },
    post: function (service, endpoint, data){
        var port = this.searchPort;
        if(service == "booking"){
            port = this.bookingPort;
        }
        return axios.post(`http://159.122.183.250:${port}/v1/${endpoint}`, data, 
            { headers: { 'crossDomain': true, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
    }
};
