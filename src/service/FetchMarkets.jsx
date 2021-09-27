import axios from 'axios';

export default function FetchMarkets(){
    let config = {
    method: 'get',
    url: 'https://api.bitpin.ir/v1/mkt/markets/',
    };

    return axios(config)
}