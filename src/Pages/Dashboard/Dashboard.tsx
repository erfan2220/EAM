//@ts-nocheck
import Links from "../../Components/Links/Links.tsx";
import {useAuth} from "../login/AuthContext.tsx";
import Cookies from "js-cookie"
import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DeActiveLinks from "../../Components/DeActiveLinks/DeActiveLinks.tsx";









const Dashboard = () =>
{

    const navigate = useNavigate();
    const {login,setLogin,
        token,setToken,
        username,setUsername
        ,accessPoint,setAccessPoint}=useAuth();
    const [loading, setLoading] = useState(false);
    const waitingOnCustomer=60*60;

    const userNameOneLogin = document.cookie.split(';').find(c=>c.trim().startsWith('oneLoginUserName='));
    const userNameValue = userNameOneLogin ? userNameOneLogin.split('=')[1] : "";
    const tokenOneLogin = document.cookie.split(';').find(c=>c.trim().startsWith('oneLoginToken='));
    const tokenOneLoginValue = tokenOneLogin ? tokenOneLogin.split('=')[1] : "";

    const tokenSmartOps=Cookies.get("oneLoginToken")
    const userNameSmartOps=Cookies.get("oneLoginUserName")

    const [value,setValue]=useState("")
    const boxes = [
            {
                id:1,
                name:"configx",
                header:"Configx",
                url:"./Logo/ConfigX.svg",
                link:"http://10.15.90.87:8001/test/user",
                redirect:"http://10.15.90.87/",
                // redirect:"http://localhost:5174/",
                // redirect:"http://10.15.90.87/",
                color:"#FF942E",
            },
            // {
            //     id:2,
            //     name:"uso",
            //     header:"USO",
            //     url:"./Logo/SmartOps.svg",
            //     link:"http://10.15.90.87:8002/test/user",
            //     redirect:"http://10.15.90.87/",
            //     color:"#4F3FF0",
            // },

            {
                id:3,
                name:"evaluex",
                header:"EvalueX",
                url:"./Logo/evaluex.svg",
                link:"http://10.15.90.87:8004/test/user",
                redirect:"http://localhost:5173",
                // redirect:"http://localhost:5173/dashboard",
                color:"#096C86",
            },
            {
                id:4,
                name:"kpix",
                header:"Kpix",
                url:"./Logo/kpix.svg",
                link:"http://10.15.90.87:8004/test/user",
                // redirect:"http://10.15.90.87:8083/",
                redirect:"http://10.15.90.88:2464/login",
                // redirect:"http://10.15.90.87:8080/realms/mci/protocol/openid-connect/auth?access_type=online&client_id=kpix&redirect_uri=http%3A%2F%2F10.15.90.88%3A2464%2Flogin%2Fgeneric_oauth&response_type=code&scope=openid+email+profile&state=i2Vu3oHWalMzjnmiEMxSDLMbO3jbX3ltKNrPRPC7TFw%3D",
                color:"#096C86",
            },
            {
                id:5,
                name:"crx",
                header:"Crx",
                url:"./Logo/crx.svg",
                link:"http://10.15.90.87:8004/test/user",
                // redirect:"http://10.15.90.87:8083/",
                redirect:"http://10.15.90.235:3000/login",
                // redirect:"http://10.15.90.87:8080/realms/mci/protocol/openid-connect/auth?access_type=online&client_id=kpix&redirect_uri=http%3A%2F%2F10.15.90.88%3A2464%2Flogin%2Fgeneric_oauth&response_type=code&scope=openid+email+profile&state=l9l0lWPl_NOfstN8HmChcx_EAmGo7Kz4wHpmx3Gb8og%3D",
                color:"#096C86",
            },
            {
                id:6,
                name:"smartops",
                header:"Smartops",
                url:"./Logo/smartops.svg",
                link:"http://10.15.90.87:8003/test/user",
                redirect:`http://10.15.90.74/login?token=${tokenSmartOps}&username=${userNameSmartOps}`,
                color:"#096C86",
            },
             {
                id:7,
                name:"eam",
                header:"EAM",
                url:"./Logo/smartops.svg",
                link:"http://10.15.90.87:8003/test/user",
                redirect:`http://10.15.90.79/`,
                color:"#096C86",
            },
        ]
     const getCookie = (name) =>
    {
        console.log(Cookies.get(name))
        return Cookies.get(name);
    };


    const getCookieValue = (name) => {
        const match = document.cookie.split(';').find(c => c.trim().startsWith(`${name}=`));
        return match ? match.split('=')[1] : "";
    };



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://10.15.90.87:8000/api/user2/${userNameValue}`, {
                    headers: { Authorization: `Bearer ${tokenOneLoginValue}` },
                });
                const userData = await response.json();
                setLogin(true);
                setAccessPoint(Object.keys(userData));

                console.log("accccccskfjlsdjf",userData)

                if (!response.ok) {
                    // throw new Error('Failed to fetch user data');
                }



            } catch (error) {
                console.error(error);
            }
        };

        const userNameValueAgain = getCookieValue('oneLoginUserName');

        if (userNameValueAgain)
        {
            fetchUserData();
        }

    }, [setAccessPoint,userNameValue, token]);



    useEffect(() =>
    {
        const checkCookie = () =>
        {
            const cookieValue = getCookie("oneLogin");

            if (!cookieValue || cookieValue === 'false')
            {
                window.location.href="http://10.15.90.87/login"
                // navigate('/login');
            }

        };

        const interval = setInterval(checkCookie, 1800000); // 30 minutes

        // Initial check
        checkCookie();

        return () => clearInterval(interval);
    }, [navigate]);





    const redirectTolink=(link)=>
    {
        // window.location.href=link;
        window.open(link)
    }


    const handleToken = async (linkredirect) =>
    {
        setLoading(true)
        /*if (token) {
            // Send request with bearer token
            fetch(link, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => console.log(data)) // Handle response data as needed
                .catch(error => console.error("Error:", error));
        }*/

        try
        {

            const response =await fetch("http://10.15.90.87:8000/test/user",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            if(!response.ok)
            {
                // throw new Error("Failed to fetch data");
                console.log("Failed to fetch data")
            }

            const data = await response.json();



            if (data.message === 'true')
            {
                window.location.href = linkredirect;
            } else {
                setLogin(false)
            }
        }
        catch (error) {
            console.error("Error:", error);
            // alert("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        let logoutTimer;

        // Function to log the user out after one hour
        const logoutAfterOneHour = () => {
            setLogin(false);
            navigate('/');
        };

        // Set timer for one hour
        const setLogoutTimer = () => {
            logoutTimer = setTimeout(logoutAfterOneHour, 3600000);
        };

        // Reset timer on user activity (e.g., clicks)
        const resetLogoutTimer = () => {
            clearTimeout(logoutTimer);
            setLogoutTimer();
        };

        // Set initial timer
        setLogoutTimer();

        // Event listeners for user activity
        window.addEventListener('click', resetLogoutTimer);
        window.addEventListener('mousemove', resetLogoutTimer);
        window.addEventListener('keydown', resetLogoutTimer);


        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('click', resetLogoutTimer);
            window.removeEventListener('mousemove', resetLogoutTimer);
            window.removeEventListener('keydown', resetLogoutTimer);
        };
    }, [setLogin, navigate]);

    const handleInput=(e)=>{
        setValue(e.target.value)
        console.log("changing",e.target.value.toLowerCase())
    }



    return (<div className=" bg-[#EAF0FA]">

            {/* <div className="t1 flex flex-col gap-[40px] py-[70px]  px-[25px] items-center">
                <div className="rounded-full bg-black p-[10px]">
                    <img src="./leftMenu/ant-design_home-filled.svg" alt="" width="35px"/>
                </div>

                <img src="./leftMenu/ant-design_pie-chart-outlined.svg" alt="" width="35px"/>
                <img src="./leftMenu/mingcute_schedule-line.svg" alt="" width="35px"/>
                <img src="./leftMenu/ep_setting.svg" alt="" width="35px"/>
            </div>*/}
              {/*<div className="t2 dashboardContainer
             w-full h-[calc(100vh-110px)] mb-[20px] flex flex-col gap-[20px] p-[20px]
             mr-[25px] cursor-pointer bg-white rounded-lg ">
            <div className="flex flex-row justify-between">
                <h2 className="text-3xl">Projects</h2>
                <div className="flex flex-row gap-[15px]">
                    <img src="./Dashboard/ci_menu-alt-01.svg" alt=""/>
                    <div className="rounded-lg bg-black p-[4px]">
                        <img src="./Dashboard/fluent_app-folder-24-regular.svg" alt=""/>
                    </div>
                </div>
            </div>
            */}

                    <div className="flex flex-row justify-between w-full">
                        <img src="./Dashboard/NetLines.svg" alt=""/>

                        <div className="py-[40px] flex flex-col items-center">
                            <span className="text-[#212121] text-[18px] mb-[16px] font-[600]">Which service are you looking for?</span>

                            <div className="flex flex-row  bg-white border-[1px] border-[#EDEDED] rounded-[8px] py-[14px] px-[24px]">
                                <input className="pr-[311px] border-none outline-none h-full" type="text" placeholder="Search services you want..." onChange={()=>handleInput(event)} />
                                <img src="./Dashboard/Search.svg" alt=""/>
                            </div>

                        </div>

                        <img src="./Dashboard/NetLines2.svg" alt=""/>
                    </div>

            <div  className=" bg-[#eaf0fa] w-[100vw] h-[100vh]">
                    <div className="flex flex-row justify-center gap-[32px] mt-[47px]">
                        {boxes.filter(item =>
                            accessPoint.includes(item.name) &&
                            (value === "" || item.name.toLowerCase().includes(value.toLowerCase()))
                        ).map((item) => (
                            <div key={item.id} onClick={() => handleToken(item.redirect)}>

                                <div onClick={() => redirectTolink(item.redirect)}>
                                    <Links url={item.url} name={item.header} />
                                </div>

                                {/*{item.redirect !== "" ?*/}
                                {/*    <div onClick={() => redirectTolink(item.redirect)}>*/}
                                {/*        <Links url={item.url} name={item.header} />*/}
                                {/*    </div> :*/}
                                {/*    <div>*/}
                                {/*        <DeActiveLinks url={item.url} name={item.header} />*/}
                                {/*    </div>*/}
                                {/*}*/}
                            </div>
                        ))}
                    </div>
            </div>

        </div>
    );
};

export default Dashboard;