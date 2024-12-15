//@ts-nocheck
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom";




const setLoginCookies = (username: string, token: string) =>
{
    // const navigate=useNavigate()
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // Cookie expires in 7 days

    // const oneloginValue=Cookies.get("oneLogin")
console.log("up")


        Cookies.set("oneLogin",true)
        Cookies.set("oneLoginUserName",username)
        Cookies.set("oneLoginToken",token)
    console.log("down")
    // navigate("/dashboard")
    window.location.href="/dashboard"
    console.log("down2")
    // document.cookie = `oneLoginUserName=${username}; expires=${expires.toUTCString()}; path=/`;
    // document.cookie = `oneLoginToken=${token}; expires=${expires.toUTCString()}; path=/`;
    // document.cookie = `oneLogin=${true}; expires=${expires.toUTCString()}; path=/`;
    return(
        <div>

        </div>
    )
};

// const sendCookiesToAnotherApp = () => {
//     fetch('http://10.15.90.72/data', {
//         method: 'GET',
//         credentials: 'include'
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error('Failed to fetch data');
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// };

export default  setLoginCookies ;