import axios from "axios";
export const getLocation = async () => {
    try{
        const config = {
            method: 'get',
            url: '/api/v1/map',
        };
        const res = await axios(config)
        // console.log(res.data)
        return res.data
    }catch(err){
        return {
            status : 'fail'
        }
    }
}
