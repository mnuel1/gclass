import { create } from 'zustand';

import axios from 'axios';

type buyerActivityLogType = {
    action: string;
    date: string;
}

type buyerActivityStore = {
    activity: buyerActivityLogType[];
    error: boolean;
    loading: boolean;
    title: string | null;
    message: string | null;
    fetchData: (token: string, id: number) => void;
    closeError: () => void;
}

export const useBuyerActivityStore = create<buyerActivityStore>((set) => ({
    activity: [],
    error: false,
    loading: false,
    title: null,
    message: null,
    fetchData: async (token:string,id: number) => {
        set({ loading: true });
        try {
            const response = await axios.get(`https://resibo-react-1.onrender.com/customer/logs/${id}`, {
                headers: {
                    'Authorization': token
                }
        });
        
            set({ activity: response.data.logs, loading: false})
        } catch (error:any) {
            set({ error: true, loading: false, title: error.response.data.title, message: error.response.data.msg});
        }
    },
    closeError: () => {
        set({ error: true, title: null, message: null})
    }
}))