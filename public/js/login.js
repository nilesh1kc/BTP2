import axios from "axios";
export const callLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementsByTagName("input")[0].value;
    const password = document.getElementsByTagName("input")[1].value;
    // console.log(email, password)
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        // console.log(res.data)
        if (res.data.status === 'success') {
            
            window.setTimeout(() => {
                location.assign('/navigator');
            }, 1000);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};