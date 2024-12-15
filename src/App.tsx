//@ts-nocheck
import Login from "./Pages/login/login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import {AuthProvider,useAuth} from "./Pages/login/AuthContext";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.tsx";



const Layout =({ repeatedLogin, count, setCount,userNameValue })=>
{

    const { login, setLogin } = useAuth()
    const navigate = useNavigate();

    return(
        <div>
            <Menu/>
            <Outlet/>
            <Footer/>
        </div>
    )
}



function App()
{
    const [repeatedLogin, setRepeatedLogin] = useState(true);
    const [count, setCount] = useState(1);

    const userNameOneLogin = document.cookie.split(';').find(c=>c.trim().startsWith('oneLoginUserName='));
    const userNameValue = userNameOneLogin ? userNameOneLogin.split('=')[1] : "";
    const { login, setLogin } = useAuth()


    const href=window.location.href;
    useEffect(()=>{

    },[href])




    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login  />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <Layout repeatedLogin={repeatedLogin}
                                setRepeatedLogin={setRepeatedLogin}
                                setCount={setCount}
                                count={count}
                                userNameValue={userNameValue}
                        />
                    }>
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/Welcome/:name" element={<WelcomePage />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}


export default App