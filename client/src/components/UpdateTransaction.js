import React, { useContext, useEffect, useState } from 'react';
import { success, fail } from "./Alerts.js";
import axios from 'axios';
import env from "../config.json";
import closeIcon from "../Images/SVGs/plus-solid-gray.svg";
import tickIcon from "../Images/SVGs/circle-check-solid.svg";
import { dataContext } from '../App.js';


const authAxios = axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})

export default function UpdateTransaction(props) {
  const [transaction, setTransaction] = useState({description: props.data.description});
  const userData = useContext(dataContext);

  const updateTransaction = async (e) => {
      e.preventDefault();
    if(transaction.description){
      await authAxios.patch(`/updateTransaction/${props.data.transactionID}`, {description: transaction.description})
      .then((res)=>{
        document.querySelector(".backgroundUpdateTransaction"+props.data.transactionID).classList.toggle("inactive");
        document.querySelector(".backgroundUpdateTransaction"+props.data.transactionID).classList.toggle("active");
        props.update();
        if(res.data==="success"){
          success("Saved Successfully!");
        }
        else{
          fail("An error occurred!");
        }
      })
      .catch((err)=>{
          fail("An error occurred!");
      });
    }
    else{
      alert("Enter all the fields!");
    }
  }

    

  return (
    <div className={"fixed top-0 left-0 w-[100%] h-[100%] bg-black/[.548] items-center justify-center inactive backgroundUpdateTransaction"+props.data.transactionID}>
        <div className='rounded w-[95%] lg:w-[700px] h-[500px] border-[1px] border-gray-300 bg-white shadow-lg relative'>
              <button className='absolute top-[3%] right-[3%] z-100' onClick={()=>{document.querySelector(".backgroundUpdateTransaction"+props.data.transactionID).classList.toggle("inactive");document.querySelector(".backgroundUpdateTransaction"+props.data.transactionID).classList.toggle("active")}}><img src={closeIcon} className='w-[20px] rotate-45' alt="close"></img></button>
              <form className='mt-[20%] lg:mt-[10%]'>
                <div className='flex flex-row ml-[5%] lg:ml-[15%] mr-[5%] lg:mr-[0%]'>
                  <p className='text-gray-700 text-[18px] lg:text-[20px] font-semibold lg:mr-10 mb-4 lg:mb-0 w-[170px]'>Entered amount: </p>
                  <p className='text-[25px] font-semibold mr-2'>₹</p>
                  <input type="number" className='block h-10 w-[100px] lg:w-[250px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md text-gray-500' value={props.data.amount} disabled={true}></input>
                </div><br/>
                <div className='flex flex-row ml-[5%] lg:ml-[15%] mr-[5%] lg:mr-[0%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[20px] font-semibold lg:mr-10 mb-4 lg:mb-0 w-[190px]'>Selected User: </p>
                    <div className='h-[170px]'>
                        <input disabled={true} className='block h-10 w-[140px] lg:w-[250px] focus:outline-0 hover:border-2 hover:border-blue-400 p-2 text-sm cursor-pointer bg-gray-200 rounded-md text-gray-500' type="text" value={props.data.requester}>
                        </input>
                    </div>
                </div><br/>
                <div className='flex flex-row ml-[5%] lg:ml-[15%] mr-[5%] lg:mr-[0%] mb-4'>
                    <p className='text-gray-700 text-[18px] lg:text-[20px] font-semibold lg:mr-10 mb-4 lg:mb-0 w-[190px]'>Add Description: </p>
                    <textarea placeholder="Add Description" className='text-[15px] font-semibold text-gray-700 block h-[100px] w-64 focus:outline-0 hover:border-2 hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md' onChange={(e)=>setTransaction({description: e.target.value})} value={transaction.description} required></textarea>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <button className='btn-green w-[150px] lg:w-[180px] h-[40px] lg:h-[40px] mb-2' onClick={(e)=>updateTransaction(e)}><img className='w-5 h-5 mr-2' src={tickIcon} alt="tick"></img>Update</button>
                </div>
              </form>
        </div>
    </div>
  )
}
