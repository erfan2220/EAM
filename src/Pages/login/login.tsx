//@ts-nocheck
import "./login.css"
import {useAuth} from "./AuthContext.tsx";
import Cookies from "js-cookie"
import  setLoginCookies from "../../Components/Cookies/cookies.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const handleLogin = (username:string, token:string) =>
{
    console.log("token2",token)
    console.log("username2",username)
    setLoginCookies(username, token);
};

// Call sendCookiesToAnotherApp when needed
// const handleSendCookies = () =>
// {
//     sendCookiesToAnotherApp();
// };

const Login = () =>
{
    const {login,setLogin,
        token,setToken,
        username,setUsername
        ,accessPoint,setAccessPoint,
        password,setPassword}=useAuth();

    const  defaultUsername ='admin';
    const defaultPassword='admin';

    // Replace these constants with your Keycloak server configuration
    const KEYCLOAK_URL = 'https://your-keycloak-server/auth';

    const CLIENT_ID = 'admin-cli';
    const CLIENT_SECRET = 'Mm2sglAL7VY5Xr6DIMuKXqIYc9nF4EKj';

    // const userNameOneLogin = document.cookie.split(';').find(c=>c.trim().startsWith('oneLoginUserName='));
    // const userNameValue = userNameOneLogin ? userNameOneLogin.split('=')[1] : "";
    // const tokenOneLogin = document.cookie.split(';').find(c=>c.trim().startsWith('oneLoginToken='));
    // const tokenOneLoginValue = tokenOneLogin ? tokenOneLogin.split('=')[1] : "";
    //
    // const oneLogin = document.cookie.split(';').find(c=>c.trim().startsWith('oneLogin='));
    // const oneLoginValue = oneLogin ? oneLogin.split('=')[1] : "";



    const userNameOneLogin =Cookies.get("oneLoginUserName")
    const tokenOneLoginValue =Cookies.get("oneLoginToken")
    const oneLoginValue=Cookies.get("oneLogin")

    const navigate=useNavigate()


    useEffect(()=>{
        if(oneLoginValue===true)
        {
            navigate('/dashboard')
        }
    },[oneLoginValue])

    // async function handleSignIn() {
    //     const url = ` http://10.15.90.87:8080/realms/master/protocol/openid-connect/token`;
    //
    //     const params = new URLSearchParams();
    //     params.append('grant_type', 'password');
    //     params.append('client_id', CLIENT_ID);
    //     params.append('username', username);
    //     params.append('password', password);
    //     if (CLIENT_SECRET)
    //     {
    //         params.append('client_secret', CLIENT_SECRET);
    //     }
    //
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: params.toString()
    //         });
    //
    //         console.log("responsehaiiiekehast",response,username,password)
    //
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //
    //         const data = await response.json();
    //         console.log("responsehaiiiekehast",data,username,password)
    //         // const token = data.token;
    //         // setToken(token);
    //         setLogin(!login);
    //         return data;
    //     } catch (error) {
    //         console.error('Error getting token:', error);
    //         alert('Failed to login. Please try again.');
    //     }
    // }

    // Usage example
    // handleSignIn()
    //     .then(data => {
    //         console.log('Access Token:', data.access_token);
    //         // Save the token in localStorage or context for further use
    //     })
    //     .catch(error => {
    //         console.error('Failed to get token:', error);
    //     });


    // const handleSignIn =()=>
    // {
    //     const url = `http://10.15.90.87:8000/mykeycloak/gettoken?username=${username}&password=${password}`;
    //
    //     fetch(url)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to login');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             // Assuming the API returns a token
    //             const token = data.toekn;
    //             setToken(token);
    //             setLogin(!login);
    //
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             alert('Failed to login. Please try again.');
    //         });
    // };




    const handleLogin = (username: string, token: string) =>
    {
        console.log("token2", token);
        console.log("username2", username);
        setLoginCookies(username, token);
    };


    const handleSignIn = async () =>
    {
        const url = `http://10.15.90.87:8000/mykeycloak/gettoken?username=${username}&password=${password}`;

        try {
            const response = await fetch(url);

            if (response.status===200)
            {
                console.log("hhhhhhhhssss")
                // throw new Error('Failed to login');
                // Cookies.set("oneLogin", "false");
                const data = await response.json();


                const token = data.token;
                setToken(token);
                handleLogin(username, token)
                console.log("testsetstst")

            }

            else {

                Cookies.remove("oneLogin")
                Cookies.remove("oneLoginToken")
                Cookies.remove("oneLoginUserName")
                // window.location.reload()
                alert("failed to login")

            }




            console.log("tokennnnnnnn", token)
            console.log("username", username)



            // Fetch user data using the obtained token
            const userDataUrl = `http://10.15.90.87:8000/api/user2/${username}`; // Replace this with your user data API endpoint
            const userDataResponse = await fetch(userDataUrl, {
                headers: {
                    Authorization: `Bearer ${token}` // Send the obtained token in the Authorization header
                }
            });
            if (!userDataResponse.ok) {
                // throw new Error('Failed to fetch user data');
                console.log("Failed to fetch user data")
            }
            else if(oneLoginValue === true) {
                // setLogin(true)
                const userData = await userDataResponse.json();
                console.log("acccccs", Object.keys(userData))
                setAccessPoint(Object.keys(userData))

                navigate("/dashboard")
            }

            /*
                const userDataUrl = `http://10.15.90.87:8000/mykeycloak/userAccess?username=${username}`; // Replace this with your user data API endpoint
                const userDataResponse = await fetch(userDataUrl, {
                    headers: {
                        Authorization: `Bearer ${token}` // Send the obtained token in the Authorization header
                    }
                });
                if (!userDataResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await userDataResponse.json();
                setAccessPoint(userData.access)
    */

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to login. Please try again.');
        }

    };








    // const handleSignIn = () =>
    // {
    //     if (username === defaultUsername && password === defaultPassword)
    //     {
    //         setLogin(!login);
    //     }
    //     else {
    //         alert('Incorrect username or password');
    //     }
    // };

    const handleUsernameChange = (event) => {

        setUsername(event.target.value)

    };

    const handlePasswordChange = (event) =>
    {
        setPassword(event.target.value);
    };




    return (
        <div className="LoginContainer w-[100vw] h-[100vh] bg-gradient-to-bl from-[#000124] to-[#2F3D60]">
            {/* <div className="inputContainer flex flex-col gap-[16px] justify-center items-center h-[100%]">


                    <div className="flex flex-row justify-between items-center bg-[#F5F5F5] rounded-full pr-2">
                     <input type="text" placeholder="username"
                            className="  px-[24px] py-[16px] w-100
                            h-100 outline-none border-none bg-transparent"
                           value={username} onChange={handleUsernameChange}/>
                        <img src="./Login/person.svg" alt="" className="w-[24px] "/>
                    </div>

                    <div className="flex flex-row justify-between items-center bg-[#F5F5F5] rounded-full pr-2">
                     <input type="text" placeholder="password"
                            className="  px-[24px] py-[16px] w-100
                             h-100 outline-none
                             border-none bg-transparent"
                            value={password} onChange={handlePasswordChange}/>
                        <img src="./Login/eye.svg" alt="" className="w-[24px] cursor-pointer "/>
                    </div>

                    <button type="submit" className="bg-transparent border-[1px] solid border-[#f5f5f5] rounded-full px-[24px] py-[16px]
                     text-white text-[16px] w-[254px]" onClick={handleSignIn}>Sign in</button>

                </div>*/}
            <div className=" flex flex-col mx-[16%] py-[6%] h-full items-center relative bottom-0">
                <div className="backgroundContainer relative">
                    <img src="./Login/ConfigXback.svg" alt=""/>
                </div>

                <div className="Usernamepasswordcontainer bg-[#212445] flex flex-row rounded-lg
                w-full gap-[56px] z-50 absolute bottom-10">
                    <div className="leftInput flex-1 my-[4%] ml-[101px]
                     border-r-[1px] border-[#424242]">
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex flex-col gap-[12px]">
                                <label htmlFor="" className="text-white">username</label>
                                <div className=" flex flex-row justify-between bg-white rounded-lg p-[10px] mr-[56px]">
                                    <input className="bg-transparent outline-none border-none w-[90%]" type="text"
                                           placeholder="Type your username here"  value={username} onChange={handleUsernameChange}/>
                                    <img src="./Login/UserCircle.svg" alt=""/>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[12px]">
                                <label htmlFor="" className="text-white">password</label>
                                <div className=" flex flex-row justify-between bg-white rounded-lg p-[10px] mr-[56px]">
                                    <input className="bg-transparent  outline-none border-none w-[90%]" type="password"
                                           placeholder="Type your password here"   value={password} onChange={handlePasswordChange}/>
                                    <img src="./Login/Lock.svg" alt=""/>
                                </div>
                            </div>

                        </div>

                        <div className="pt-[32px]  mr-[56px]">
                            <button type="submit"
                                    className="bg-[#007BFF] w-full text-white rounded-lg py-[11px]"  onClick={handleSignIn}>
                                Login</button>
                        </div>

                    </div>

                    <div className="rightInput mt-[90px] mr-[20px]
                    flex-1 flex flex-col gap-[16px] text-white">
                        <span className="mb-[30px] text-[20px] font-bold">OSS Portal</span>
                        <span>Welcome In</span>
                        <span>Mv oss Product</span>
                        <div className="flex flex-row gap-[12px]">
                            <img src="./Login/Info.svg" alt=""/>
                            <span>Please Enter your Username and Password to Login</span>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;
