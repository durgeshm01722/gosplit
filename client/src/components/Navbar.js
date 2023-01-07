import React from 'react';
import userIcon from "../Images/SVGs/user-solid.svg";
import loginIcon from "../Images/SVGs/right-to-bracket-solid.svg";

export default function Navbar() {

  return (
    <div className='bg-gray-100 w-[100%] h-[100px] flex flex-row items-center'>
      <div className='flex flex-row justify-center items-center ml-2 lg:ml-20'>
        <img onClick={()=>window.location.reload()} src={require("../Images/logo/logo.png")} className="w-[55px] mr-4 cursor-pointer"></img>
        <p onClick={()=>window.location.reload()} className='text-[30px] font-bold text-[#ffb616] cursor-pointer'>GoSplit</p>
      </div>
      <div id="loginContainer" className='absolute right-[5%] lg:right-[1%] top-[3%] h-fit w-[150px] flex flex-col items-end lg:items-start'>
          {localStorage.getItem("username")?<button id="userIconButton" className='rounded-full border-gray-700 border-2 h-[50px] w-[50px] flex flex-row items-center justify-center' onClick={()=>{document.querySelector(".dropdownContent").classList.toggle("inactive");document.querySelector(".dropdownContent").classList.toggle("active")}}><img src={userIcon} alt="user" className='w-[30px] h-[30px]'></img></button>:<button className='h-[30px] w-[30px] flex flex-row items-center justify-center' onClick={()=>{document.querySelector(".backgroundLogin").classList.toggle("inactive");document.querySelector(".backgroundLogin").classList.toggle("active")}}><img src={loginIcon} alt="login" className='w-[30px] h-[30px]' id="loginIcon"></img></button>}
          <div id="dropdown">
              <div className='dropdownContent flex-col inactive bg-white shadow-lg border-[1px] border-gray-200 w-[130px] pl-4 rounded-sm z-9'>
                  <div className='h-[40px] flex justify-start items-center'><a className='font-semibold cursor-pointer' onClick={()=>{document.querySelector(".backgroundRegister").classList.toggle("inactive");document.querySelector(".backgroundRegister").classList.toggle("active");}}>Register new</a></div>
                  <div className='h-[40px] flex justify-start items-center'><a className='font-semibold cursor-pointer' onClick={()=>{localStorage.clear();window.location.href = '/';}}>Logout</a></div>
              </div>
          </div>
      </div>
    </div>
  )
}
