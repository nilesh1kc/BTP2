import axios from "axios";
export const performLogout = async(e)=>{
    e.preventDefault();
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });
        // console.log(res.data)
        if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
}