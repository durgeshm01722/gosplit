import React, { useContext } from 'react';
import { dataContext } from '../App.js';

export default function Data() {
    const userData = useContext(dataContext);

    const displayAmountInINR = (num) => {
        return num.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        });
    }

  return (
    <div className='shadow-xl w-[90%] lg:w-[80%] h-[350px] lg:h-[400px] border-[1px] border-lightgray rounded-md mt-[20%] lg:mt-[5%] flex flex-col lg:flex-row justify-center items-center p-[2%]' data-aos="fade-up" data-aos-duration="1000">
        <div className='border-b-[1px] lg:border-r-[1px] lg:border-b-[0px] border-gray-400 h-[40%] w-[90%] lg:h-[90%] lg:w-[40%] flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-gray-600 text-[30px] lg:text-[40px] font-semibold'>Total balance: </h1>
                <h1 className='text-gray-600 text-[45px] lg:text-[55px] font-bold'>{displayAmountInINR(userData.data.totalBalance)}</h1>
            </div>
        </div>
        <div className='w-[100%] h-[60%] lg:h-[90%] lg:w-[60%] pl-[5%] flex flex-col justify-center'>
            <div className='flex flex-col justify-center items-start w-fit'>
                <p className='text-gray-600 text-[20px] lg:text-[30px] font-semibold'>Total amount spent: </p>
                <p className='text-gray-600 text-[20px] lg:text-[30px] font-semibold'>{displayAmountInINR(userData.data.totalAmountSpent)}</p>
            </div><br/>
            <div className='flex flex-col justify-center items-start w-fit'>
                <p className='text-gray-600 text-[20px] lg:text-[30px] font-semibold'>Budget remaining: </p>
                <p className='text-gray-600 text-[20px] lg:text-[30px] font-semibold'>{displayAmountInINR(userData.data.budgetRemaining)}</p>
            </div>
        </div>
    </div>
  )
}

