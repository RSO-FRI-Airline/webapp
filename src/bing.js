'use strict';
import axios from 'axios';

export default{
    subscriptionKey: "56c56f76595b4f84a9e049e684eff1ad",
    host: "api.cognitive.microsoft.com/bing/v7.0/images/search",
    search: function(city) {
        var config = {
            headers: {'Ocp-Apim-Subscription-Key': this.subscriptionKey}
        };
        axios.get(this.host+"?q="+encodeURIComponent(city+" city"), config);
    }
};
