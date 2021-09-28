import axios from 'axios';

export default async function FetchChart(id){
    let output = {};
    let config = {
        method: 'get',
        url: 'https://api.bitpin.ir/v1/mkt/markets/charts/' ,
    };
    let result = await axios(config);
    let lastCount = 0;
    let count = result.data.results.length;
    while(true){
        if (id<count){
            result.data.results[id-lastCount];
        }
    }
    return 
}