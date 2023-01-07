import React, { useContext } from 'react';
import editIcon from "../Images/SVGs/pen-to-square-solid.svg";
import deleteIcon from "../Images/SVGs/trash-solid.svg";
import UpdateTransaction from './UpdateTransaction';
import { dataContext } from '../App.js';

export default function SingleTransaction(props) {
    const userData = useContext(dataContext)

    const displayAmountInINR = (num) => {
        return num.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        });
    }

    const displayTransactionParticipants = () => {
        if(props.data.requester===props.data.requestTo){
            return (<p className='text-center break-words h-fit w-[100%]'>{"You owe yourself "+displayAmountInINR(props.data.amount)}</p>)
        }
        else if (props.data.requester===userData.data.username){
            return (<p className='text-center break-words h-fit w-[100%]'><p className='font-bold inline'>{props.data.requestTo}</p>{" owes you "+displayAmountInINR(parseInt(props.data.amount))}</p>)
        }
        else if (props.data.requestTo===userData.data.username){
            return (<p className='text-center break-words h-fit w-[100%]'>{"You owe "}<p className='font-bold inline'>{props.data.requester}</p>{" "+displayAmountInINR(props.data.amount)}</p>)
        }
    }



  return (
    <>
    <UpdateTransaction data={props.data} update={props.update}></UpdateTransaction>
    <div className='border-[1px] border-gray-200 w-[95%] lg:w-[90%] h-[350px] lg:h-[150px] rounded-md shadow-lg flex flex-col lg:flex-row p-[10px] px-[20px] lg:px-[30px] my-2' data-aos="fade-up" data-aos-duration="1000">
        <div className='border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-gray-300 lg:w-[25%] flex flex-col justify-center items-start pb-2 lg:pb-2 overflow-hidden h-[40%] lg:h-[100%]'>
            <div className='h-[80px] lg:h-fit'>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-bold inline'>Request from: </p>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-semibold inline'>{props.data.requester===localStorage.getItem("username")?"You":props.data.requester}</p>
            </div>
            <div className='h-[80px] lg:h-fit'>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-bold inline'>Request to: </p>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-semibold inline break-words'>{props.data.requestTo===localStorage.getItem("username")?"You":props.data.requestTo}</p>
            </div>
        </div>
        <div className='border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-gray-300 lg:w-[25%] flex justify-start lg:justify-center items-center h-[20%] lg:h-[100%]'>
            <p className='text-gray-600 text-[15px] lg:text-[18px] font-semibold w-[80%] h-[80%] flex justify-center items-center'>{displayTransactionParticipants()}</p>
        </div>
        <div className='border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-gray-300 lg:w-[25%] flex flex-col justify-center items-start lg:pl-6  h-[30%] lg:h-[100%]'>
            <div>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-bold inline'>Date: </p>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-semibold inline'>{props.data.date}</p>
            </div>
            <div>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-bold inline'>Description: </p>
                <p className='text-gray-600 text-[15px] lg:text-[18px] font-semibold w-[90%] inline break-words overflow-hidden'>{props.data.description}</p>
            </div>
        </div>
        <div className='lg:w-[25%] flex flex-col gap-[1px] lg:gap-2 justify-center items-center h-[45%] lg:h-[100%] pt-4 lg:pt-0'>
            <button onClick={()=>{document.querySelector(".backgroundUpdateTransaction"+props.data.transactionID).classList.toggle("inactive");document.querySelector(".backgroundUpdateTransaction"+props.data.transactionID).classList.toggle("active")}} className='btn-violet w-[180px] h-[40px] lg:h-[40px] mb-2'>
                <img src={editIcon} alt="user" className='w-5 h-5 mr-2'></img>
                <p className='text-md'>Update Transaction</p>
            </button>
            <button onClick={()=>{props.deleteTransaction(props.data.transactionID)}} className='btn-red w-[180px] h-[40px] lg:h-[40px] mb-2'>
                <img src={deleteIcon} alt="user" className='w-5 h-5 mr-2'></img>
                <p className='text-md'>Delete Transaction</p>
            </button>
        </div>
    </div>
    </>
  )
}
