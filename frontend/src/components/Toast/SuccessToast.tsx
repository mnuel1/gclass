
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SuccessToast = (msg: string) => {
    // Trigger the toast notification
    toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce                
    });
        
}
