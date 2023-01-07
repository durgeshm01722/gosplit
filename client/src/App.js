import './App.css';
import Data from './components/Data';
import Transactions from './components/Transactions';
import Navbar from './components/Navbar';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import { createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import env from "./config.json";
import { success, fail } from "./components/Alerts";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export const dataContext = createContext();

function App() {
  const [data, setData] = useState({username: "", name: "", email: "", token: "", totalBalance: 0, totalAmountSpent: 0, budgetRemaining: 0});

  const getUserData = async () => {
    if(localStorage.getItem("username")!==undefined){
      await axios.get(`${env.BACKEND_URL}/getUserData`, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then((res)=>{
        setData({name: res.data.name, username: res.data.username, email: res.data.email, token: localStorage.getItem("token"), totalBalance: res.data.totalBalance, totalAmountSpent: res.data.totalAmountSpent, budgetRemaining: res.data.budgetRemaining})
      })
      .catch((err)=>{
        fail("An error occurred!!")
      })
    }
  }

  useEffect(()=>{
    getUserData();
  },[]);

  return (
    <>
    <dataContext.Provider value={{data, setData}}>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoginDialog/>
      <RegisterDialog/>
      <Navbar/>
      {data.username ? <div className='flex flex-col gap-28 justify-center items-center'>
        <Data/>
        <Transactions/>
      </div>:
      <div className='flex flex-col justify-center items-center h-[700px]' data-aos="fade-up" data-aos-duration="1000">
        <p className='text-[30px] font-semibold text-gray-700'>Please Log in/Register to use the web app</p>
        <p className='text-[20px] font-semibold text-blue-600 cursor-pointer' onClick={()=>{
          document.querySelector(".backgroundLogin").classList.toggle("inactive");
          document.querySelector(".backgroundLogin").classList.toggle("active");
        }}>Login</p>
        <p className='text-[20px] font-semibold text-blue-600 cursor-pointer' onClick={()=>{
          document.querySelector(".backgroundRegister").classList.toggle("inactive");
          document.querySelector(".backgroundRegister").classList.toggle("active");
        }}>Register</p>
      </div>
      }
    </dataContext.Provider>
    </>
  );
}

export default App;
