import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success = (caption)=> {
    toast.success(caption, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
}

export const fail = (caption)=> {
    toast.error(caption, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
}