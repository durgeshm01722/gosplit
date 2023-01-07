import React, { useContext, useState } from 'react';
import { success, fail } from "./Alerts.js";
import axios from 'axios';
import env from "../config.json";
import closeIcon from "../Images/SVGs/plus-solid-gray.svg";
import userIcon from "../Images/SVGs/user-solid-white.svg";
import loginIcon from "../Images/SVGs/right-to-bracket-solid-white.svg";
import { dataContext } from '../App.js';

export default function LoginDialog() {
    const [loginData, setLoginData] = useState({username: "", password: ""});
    const data = useContext(dataContext)

    const loginUser = async (e) => {
        e.preventDefault();
        if(loginData.username && loginData.password){
          await axios.post(`${env.BACKEND_URL}/login`, {username: loginData.username, password: loginData.password})
          .then((res)=>{
            if(res.data==="invalid user"){
              fail("Invalid User!");
            }
            else{
              success("Logged in successfully!");
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("token", res.data.token);
              data.setData({...data.data, username: res.data.username, name: res.data.name, email: res.data.email, token: res.data.token});
              document.querySelector(".backgroundLogin").classList.toggle("inactive");
              document.querySelector(".backgroundLogin").classList.toggle("active");
              window.location.href = '/';
            }
          })
          .catch((err)=>{
              fail("An error occurred!");
          });
        }
        else{
          alert("Fill all the fields!");
        }
    }

    const demoUser = async (e)=> {
        e.preventDefault();
        await axios.post(`${env.BACKEND_URL}/login`, {username: "demouser", password: "demouser"}, { 
          headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW91c2VyIiwiaWF0IjoxNjczMDA0NTQ1fQ.v8TgI-vJ8sPjeSbF3ts-cG7nZOW8VTGICQYkgduW7GE"}})
        .then((res)=>{
            success("Logged in successfully!");
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("token", res.data.token);
            data.setData({...data.data, username: res.data.username, name: res.data.name, email: res.data.email, token: res.data.token});
            document.querySelector(".backgroundLogin").classList.toggle("inactive");
            document.querySelector(".backgroundLogin").classList.toggle("active");
            window.location.href = '/';
        })
        .catch((err)=>{
            console.log(err.message)
            fail("An error occurred!");
        });
    }

  return (
    <div className={"backgroundLogin w-[100%] h-[100%] fixed top-0 left-0 bg-black/[.548] items-center justify-center inactive z-10"}>
        <div className='rounded w-[95%] lg:w-[400px] h-[450px] border-[1px] border-gray-300 bg-white shadow-lg relative'>
              <button className='absolute top-[3%] right-[3%] z-100' onClick={()=>{document.querySelector(".backgroundLogin").classList.toggle("inactive");document.querySelector(".backgroundLogin").classList.toggle("active")}}><img src={closeIcon} className='w-[20px] rotate-45' alt="close"></img></button>
              <form className='mt-[20%] lg:mt-[15%]'>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[18px] font-semibold lg:mr-10 w-[170px]'>Username: </p>
                    <input className='mt-2 block h-10 w-[270px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md' type="text" required onChange={(e)=>{setLoginData({...loginData, username: e.target.value})}} value={loginData.username} placeholder="Enter username"></input>
                </div><br/>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[18px] font-semibold lg:mr-10 w-[170px]'>Password: </p>
                    <input className='mt-2 block h-10 w-[270px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md ' type="text" required onChange={(e)=>{setLoginData({...loginData, password: e.target.value})}} value={loginData.password} placeholder="Enter password"></input>
                </div><br/>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[15px] lg:text-[15px] font-semibold lg:mr-10 w-[170px]'>Don't have an account? </p>
                    <p className='text-blue-600 text-[15px] lg:text-[15px] font-bold lg:mr-10 mb-4 lg:mb-0 w-[170px] cursor-pointer' onClick={()=>{
                        document.querySelector(".backgroundRegister").classList.toggle("inactive");
                        document.querySelector(".backgroundRegister").classList.toggle("active");
                        document.querySelector(".backgroundLogin").classList.toggle("inactive");
                        document.querySelector(".backgroundLogin").classList.toggle("active");
                    }}>Register</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center mt-[5%]'>
                    <button className='btn-green w-[150px] lg:w-[180px] h-[40px] lg:h-[40px] mb-2' onClick={(e)=>{loginUser(e)}}><img className='w-5 h-5 mr-2' src={loginIcon} alt="tick"></img>Login</button>
                    <button  className='btn-green w-[150px] lg:w-[180px] h-[40px] lg:h-[40px] mb-2' onClick={(e)=>{demoUser(e)}}><img className='w-5 h-5 mr-2' src={userIcon} alt="tick"></img>Demo User</button>
                </div>
              </form>
        </div>
    </div>
  )
}
