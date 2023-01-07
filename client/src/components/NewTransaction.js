import React, { useContext, useEffect, useState } from 'react';
import { success, fail } from "./Alerts.js";
import axios from 'axios';
import env from "../config.json";
import closeIcon from "../Images/SVGs/plus-solid-gray.svg";
import sendIcon from "../Images/SVGs/circle-arrow-right-solid.svg";
import receiveIcon from "../Images/SVGs/circle-arrow-left-solid.svg";
import { dataContext } from '../App.js';


const authAxios = axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})

export default function NewTransaction(props) {
    const [transaction, setTransaction] = useState({amount: 0, description: ""});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({username: "", name: ""});
    const [filteredUsers, setFilteredUsers] = useState([]);
    const userData = useContext(dataContext);

    const getUsers = async () => {
        await authAxios.get("/users").then((res)=>{
        if(res.data==="not authorized!"){
          fail("Not Authorized!");
        }
        else{
          setUsers(res.data);
          setFilteredUsers(res.data);
        }
      })
    }

    const filterUsers = (e)=> {
        setFilteredUsers(users.filter((item)=>{
          return item.username.toLowerCase().indexOf(e.target.value.toLowerCase())!==-1;
        }))
        if(filteredUsers[0]===undefined){
          document.getElementById("usersSelectId").style.width = "0px";
          document.getElementById("usersSelectId").style.height = "0px";
        }
        else{
          document.getElementById("usersSelectId").style.width = "250px";
          document.getElementById("usersSelectId").style.height = "fit-content";
        }
    }

    const sendMoney = async (e)=> {
        e.preventDefault();
        let now = new Date();
        if(selectedUser.username && transaction.description && transaction.amount){
          var budgetRemaining = userData.data.budgetRemaining;
          var totalBalance = userData.data.totalBalance;
          var totalAmountSpent = userData.data.totalAmountSpent;
          if(userData.data.username!==selectedUser.username){
            budgetRemaining = userData.data.totalBalance - transaction.amount;
            totalBalance = userData.data.totalBalance - transaction.amount; 
            totalAmountSpent = userData.data.totalAmountSpent + transaction.amount;
          }
          await authAxios.post("/createTransaction/send", {requester: selectedUser.username, requestTo: localStorage.getItem("username"), date: now.getFullYear()+"-"+(((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1))+"-"+(((now.getDate())<10?"0":"")+now.getDate()),
          description: transaction.description, amount: parseInt(transaction.amount), totalBalance: parseInt(totalBalance), totalAmountSpent: parseInt(totalAmountSpent), budgetRemaining: parseInt(budgetRemaining)})
          .then(async (res)=>{
            document.querySelector(".backgroundNewTransaction").classList.toggle("inactive");
            document.querySelector(".backgroundNewTransaction").classList.toggle("active");
            userData.setData({...userData.data, totalBalance: totalBalance, totalAmountSpent: totalAmountSpent, budgetRemaining: budgetRemaining})
            props.update();
            setTransaction({amount: 0, description: ""});
            setSelectedUser({username: "", name: ""})
            if(res.data==="success"){
              success("Saved Successfully!");
            }
            else{
              fail("An error occurred!");
            }
          })
          .catch((err)=>{
              console.log(err.message);
              fail("An error occurred!");
          });
        }
        else{
          alert("Enter all the fields!");
        }
    }

    const requestMoney = async (e)=> {
        e.preventDefault();
        let now = new Date();
        if(selectedUser.username && transaction.description && transaction.amount){
          await authAxios.post("/createTransaction/receive", {requester: localStorage.getItem("username"), requestTo: selectedUser.username, date: now.getFullYear()+"-"+(((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1))+"-"+(((now.getDate())<10?"0":"")+now.getDate()),
          description: transaction.description, amount: transaction.amount})
          .then((res)=>{
            document.querySelector(".backgroundNewTransaction").classList.toggle("inactive");
            document.querySelector(".backgroundNewTransaction").classList.toggle("active");
            props.update();
            setTransaction({amount: 0, description: ""});
            setSelectedUser({username: "", name: ""})
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

    useEffect(() => {
        getUsers();
    }, []);

  return (
    <div className={"backgroundNewTransaction w-[100%] h-[100%] fixed top-0 left-0 bg-black/[.548] items-center justify-center inactive"}>
        <div className='rounded w-[95%] lg:w-[700px] h-[500px] border-[1px] border-gray-300 bg-white shadow-lg relative'>
              <button className='absolute top-[3%] right-[3%] z-100' onClick={()=>{document.querySelector(".backgroundNewTransaction").classList.toggle("inactive");document.querySelector(".backgroundNewTransaction").classList.toggle("active")}}><img src={closeIcon} className='w-[20px] rotate-45' alt="close"></img></button>
              <form className='mt-[20%] lg:mt-[10%]'>
                <div className='flex flex-row ml-[5%] lg:ml-[15%] mr-[5%] lg:mr-[0%]'>
                  <p className='text-gray-700 text-[18px] lg:text-[20px] font-semibold lg:mr-10 mb-4 lg:mb-0 w-[170px]'>Enter amount: </p>
                  <p className='text-[25px] font-semibold mr-2'>₹</p>
                  <input type="number" className='block h-10 w-[100px] lg:w-[250px] focus:outline-0 hover:border-2 text-[15px] font-semibold hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md mb-2 lg:mb-0' required onChange={(e)=>{setTransaction({...transaction, amount: e.target.value})}} value={transaction.amount} placeholder="Enter amount"></input>
                </div><br/>
                <div className='flex flex-row ml-[5%] lg:ml-[15%] mr-[5%] lg:mr-[0%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[20px] font-semibold lg:mr-10 mb-4 lg:mb-0 w-[190px]'>Select User: </p>
                    <div className='h-[170px]'>
                        <input className='block h-10 w-[150px] lg:w-[250px] focus:outline-0 hover:border-2 hover:border-blue-400 p-2 text-sm cursor-pointer bg-gray-200 rounded-md' type="text" required onChange={(e)=>{setSelectedUser(e);filterUsers(e);document.querySelector(".usersSelect").classList.add("active")}} onClick={()=>{document.querySelector(".usersSelect").classList.toggle("inactive");document.querySelector(".usersSelect").classList.toggle("active");setFilteredUsers(users)}} value={selectedUser.username}>
                        </input>
                        <div id="usersSelectId" className={"h-[120px] max-h-[120px] overflow-y-scroll w-[150px] lg:w-[250px] bg-gray-200 mt-2 pl-2 pt-2 rounded-md flex-col inactive usersSelect"}>
                            {filteredUsers.map((item, key)=>{return (
                                <div className='cursor-pointer my-[2px] ' key={key} onClick={()=>{setSelectedUser({username: item.username, name: item.name});document.querySelector(".usersSelect").classList.toggle("inactive");document.querySelector(".usersSelect").classList.toggle("active")}}>
                                    <h3 className='text-[15px] font-bold text-gray-700'>{item.name}</h3>
                                    <p className='text-[15px] font-semibold text-gray-700'>{item.username}</p>
                                </div>
                            )})}
                        </div>
                    </div>
                </div><br/>
                <div className='flex flex-row ml-[5%] lg:ml-[15%] mb-2 mr-[5%] lg:mr-[0%]'>
                    <p className='text-gray-700 text-[18px] lg:text-[20px] font-semibold lg:mr-10 mb-4 lg:mb-0 w-[190px]'>Add Description: </p>
                    <textarea placeholder="Add Description" className='text-[15px] font-semibold text-gray-700 block h-[100px] w-64 focus:outline-0 hover:border-2 hover:border-blue-400 p-2 text-sm bg-gray-200 rounded-md mb-2 lg:mb-0' onChange={(e)=>setTransaction({...transaction, description: e.target.value})} value={transaction.description} required></textarea>
                </div>
                <div className='flex flex-row gap-4 justify-center items-center mx-[5%] lg:mx-[0%]'>
                    <button className='btn-green  w-[150px] lg:w-[180px] h-[40px] lg:h-[40px] mb-2' onClick={(e)=>sendMoney(e)}><img className='w-5 h-5 mr-2' src={sendIcon} alt="tick"></img>Send</button>
                    <button  className='btn-green w-[150px] lg:w-[180px] h-[40px] lg:h-[40px] mb-2' onClick={(e)=>requestMoney(e)}><img className='w-5 h-5 mr-2' src={receiveIcon} alt="tick"></img>Request</button>
                </div>
              </form>
        </div>
    </div>
  )
}
