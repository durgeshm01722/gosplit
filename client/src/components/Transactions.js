import React, { useContext, useEffect, useState } from 'react'
import SingleTransaction from './SingleTransaction';
import NewTransaction from './NewTransaction';
import addIcon from "../Images/SVGs/plus-solid.svg";
import crossIcon from "../Images/SVGs/circle-xmark-solid.svg";
import axios from 'axios';
import env from "../config.json";
import { success, fail } from "./Alerts.js";
import { dataContext } from '../App.js';

const authAxios = axios.create({
    baseURL: env.BACKEND_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export default function Transactions() {
    const [data, setData] = useState([]);
    var [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({date: "", category: ""});
    const userData = useContext(dataContext);

    const getData = async () => {
      await authAxios.get("/transactions").then((res)=>{
        if(res.data==="not authorized!"){
          fail("Not Authorized!");
        }
        else{
          res.data = res.data.reverse()
          setData(res.data);
          setFilteredData(res.data);
        }
      })
    }

    const deleteTransaction = (transactionID)=>{
        authAxios.delete(`/deleteTransaction/${transactionID}`).then((res)=>{
          if(res.data==="success"){
            success("Deleted Successfully!");
          }
          else{
            fail("An error occurred!");
          }
          setFilteredData(filteredData.filter((e)=>{
            return e.transactionID !== transactionID;
          }))
          getData();
        })
      }
  
    useEffect(() => {
      getData();
    }, []);

    const filterByDate = (date) => {
      setFilteredData(data.filter((item)=> {
        return item.date === date
      }));
    }

    const filterByCategory = (val) => {
      if(val==="Sent"){
        setFilteredData(data.filter((item)=> {
          return item.requestTo === userData.data.username;
        }));
      }
      else{
        setFilteredData(data.filter((item)=> {
          return item.requester === userData.data.username;
        }));
      }
    }

  return (
    <>
    <NewTransaction update={getData}></NewTransaction>
    <div className='h-[900px] lg:w-[80%] w-[90%] flex flex-col items-end'>
        <div className='flex flex-col lg:flex-row justify-center items-start lg:items-center w-[100%] lg:w-[100%] pb-4 mb-2 lg:mb-10 lg:border-b-[1px] lg:border-t-0 border-gray-300' data-aos="fade-up" data-aos-duration="1000">
            <h1 className='text-gray-600 text-[30px] lg:text-[35px] font-semibold w-[100%] lg:w-[30%]'>Your Transactions</h1>
            <div className='flex flex-col lg:flex-row justify-end items-start lg:items-center w-[100%] lg:w-[70%] lg:pr-4 border-y-[1px] lg:border-y-0 border-gray-300 mt-10 lg:mt-0 pt-4 lg:pt-0'>
                <p className='text-gray-600 text-[20px] lg:text-[22px] font-bold lg:mr-8 mb-4 lg:mb-0 lg:w-[20%]'>Filter by: </p>
                <p className='text-gray-600 text-[15px] lg:text-[15px] font-bold lg:mr-4'>Date: </p>
                <input type="date" className='mb-4 lg:mb-0 lg:mr-6 h-10 w-64 focus:outline-0 hover:border-2 hover:border-red-400 p-2 text-sm mt-1 cursor-pointer bg-gray-100 rounded-md' onChange={(e)=>{filterByDate(e.target.value); setFilters({...filters, date: e.target.value})}} value={filters.date}></input>
                <p className='text-gray-600 text-[15px] lg:text-[15px] font-bold mr-4'>Category: </p>
                <select required className='block h-10 w-64 focus:outline-0 hover:border-2 hover:border-red-400 p-2 text-sm mt-1 cursor-pointer bg-gray-100 rounded-md mb-4 lg:mb-0' defaultChecked={filters.category} onChange={(e)=>{filterByCategory(e.target.value); setFilters({...filters, category: e.target.value})}}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    <option value="Sent">Sent</option>
                    <option value="Requested">Requested</option>
                </select>
                <button onClick={()=>{setFilters({date: "", category: ""}); setFilteredData(data)}} className='btn-violet w-[140px] lg:w-[170px] h-[40px] lg:h-[40px] mb-4 lg:mb-0 lg:ml-4'>
                  <img src={crossIcon} alt="user" className='w-5 h-5 mr-2'></img>
                  <p className='text-md'>Clear Filters</p>
                </button>
            </div>
        </div>
        <button onClick={()=>{document.querySelector(".backgroundNewTransaction").classList.toggle("inactive");document.querySelector(".backgroundNewTransaction").classList.toggle("active")}} className='btn-green w-[180px] h-[90px] lg:h-[50px] mb-2' data-aos="fade-up" data-aos-duration="1000">
            <img src={addIcon} alt="user" className='w-5 h-5 mr-2'></img>
            <p className='text-md'>New Transaction</p>
        </button>
        <div className='h-[900px] w-[100%] lg:w-[100%] lg:h-[900px] mb-10 border-[1px] border-gray-300 rounded-md flex flex-col justify-start items-center pt-8 overflow-y-scroll'>
            {
                filteredData.map((item)=>{
                    return (<SingleTransaction key={data.transactionID} data={item} deleteTransaction={deleteTransaction} update={getData}/>)
                })
            }
        </div>
    </div>
    </>
  )
}
