import axios from 'axios';

export default async function FetchChart(id){
    let output = [];
    let config = {
        method: 'get',
        url: 'https://api.bitpin.ir/v1/mkt/markets/charts/' ,
    };
    let result = await axios(config);

    while(true){
        for (let i of result.data.results){
            if (i.code == id){
                output=i;
                return output;
            }
        }
        config.url = result.data.next;
        result = await axios(config);
    }
}