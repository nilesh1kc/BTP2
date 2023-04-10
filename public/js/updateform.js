import axios from "axios";

export const updateForm = async(e)=>{
    e.preventDefault();
    const longitude = document.getElementsByTagName("input")[0].value;
    const lattitude = document.getElementsByTagName("input")[1].value;
    const type = document.getElementsByTagName("select")[0].value;
    const similarity = document.getElementsByTagName("input")[2].value;
    const frequency = document.getElementsByTagName("input")[3].value;
    if(longitude && lattitude && (frequency || similarity)){
        const data ={
            radius: 0,
            location: {
                coordinates: [lattitude,longitude]
            },
            type,
            frequency,
            similarity
        }
        const config = {
            method: 'post',
            url: '/api/v1/map',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        const res = await axios(config)
        console.log(res.data)
        alert(res.data.message)
    }
}