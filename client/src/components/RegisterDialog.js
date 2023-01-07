import React, { useState } from 'react';
import { success, fail } from "./Alerts.js";
import axios from 'axios';
import env from "../config.json";
import closeIcon from "../Images/SVGs/plus-solid-gray.svg";
import loginIcon from "../Images/SVGs/right-to-bracket-solid-white.svg";
import { dataContext } from '../App.js';

export default function LoginDialog() {
    const [registerData, setRegisterData] = useState({name: "", username: "", email: "", password: ""});

    const registerUser = async (e) => {
        e.preventDefault();
        if(registerData.name && registerData.username && registerData.email && registerData.password){
          await axios.post(`${env.BACKEND_URL}/register`, {name: registerData.name, username: registerData.username, email: registerData.email, password: registerData.password})
          .then((res)=>{
            if(res.data==="user already exists"){
              fail("User already exists!");
            }
            else{
              success("Logged in successfully!");
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("token", res.data.token);
              dataContext.setData({...dataContext.data, username: res.data.username, name: res.data.name, email: res.data.email, token: res.data.token});
              document.querySelector(".backgroundRegister").classList.toggle("inactive");
              document.querySelector(".backgroundRegister").classList.toggle("active");
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

  return (
    <div className={"backgroundRegister w-[100%] h-[100%] fixed top-0 left-0 bg-black/[.548] items-center justify-center inactive z-10"}>
        <div className='rounded w-[95%] lg:w-[420px] h-[500px] border-[1px] border-gray-300 bg-white shadow-lg relative'>
              <button className='absolute top-[3%] right-[3%] z-100' onClick={()=>{document.querySelector(".backgroundRegister").classList.toggle("inactive");document.querySelector(".backgroundRegister").classList.toggle("active")}}><img src={closeIcon} className='w-[20px] rotate-45' alt="close"></img></button>
              <form className='mt-[15%] lg:mt-[10%]'>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[18px] font-semibold lg:mr-10 w-[170px]'>Name: </p>
                    <input className='mt-2 block h-10 w-[270px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md mb-2 lg:mb-2' type="text" required onChange={(e)=>{setRegisterData({...registerData, name: e.target.value})}} value={registerData.name} placeholder="Enter name"></input>
                </div>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[18px] font-semibold lg:mr-10 w-[170px]'>Username: </p>
                    <input className='mt-2 block h-10 w-[270px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md mb-2 lg:mb-2' type="text" required onChange={(e)=>{setRegisterData({...registerData, username: e.target.value})}} value={registerData.username} placeholder="Enter username"></input>
                </div>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[18px] font-semibold lg:mr-10 w-[170px]'>Email: </p>
                    <input className='mt-2 block h-10 w-[270px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md mb-2 lg:mb-2' type="text" required onChange={(e)=>{setRegisterData({...registerData, email: e.target.value})}} value={registerData.email} placeholder="Enter email"></input>
                </div>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[18px] font-semibold lg:mr-10 w-[170px]'>Password: </p>
                    <input className='mt-2 block h-10 w-[270px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md mb-2 lg:mb-4' type="text" required onChange={(e)=>{setRegisterData({...registerData, password: e.target.value})}} value={registerData.password} placeholder="Enter password"></input>
                </div>
                <div className='flex flex-col ml-[5%] lg:ml-[15%]'>
                    <p className='text-gray-700 text-[15px] lg:text-[15px] font-semibold lg:mr-10 w-[170px]'>Already a user? </p>
                    <p className='text-blue-600 text-[15px] lg:text-[15px] font-bold lg:mr-10 mb-2 lg:mb-0 w-[170px] cursor-pointer' onClick={()=>{
                        document.querySelector(".backgroundRegister").classList.toggle("inactive");
                        document.querySelector(".backgroundRegister").classList.toggle("active");
                        document.querySelector(".backgroundLogin").classList.toggle("inactive");
                        document.querySelector(".backgroundLogin").classList.toggle("active");
                    }}>Login</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center mt-[3%]'>
                    <button className='btn-green w-[150px] lg:w-[180px] h-[40px] lg:h-[40px] mb-2' onClick={(e)=>{registerUser(e)}}><img className='w-5 h-5 mr-2' src={loginIcon} alt="tick"></img>Register</button>
                </div>
              </form>
        </div>
    </div>
  )
}
