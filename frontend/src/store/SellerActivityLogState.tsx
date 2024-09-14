import { create } from 'zustand';
import axios from 'axios';
type SellerActivityLogState = {
    action: string;
    createdAt: string;
}

type sellerActivityStore = {
    activity: SellerActivityLogState[];
    error: boolean;
    loading: boolean;
    title: string | null;
    message: string | null;
    fetchData: (token: string) => void;
    closeError: () => void;
}

export const useSellerActivityStore = create<sellerActivityStore>((set) => ({
    activity: [],
    error: false,
    loading: false,
    title: null,
    message: null,
    fetchData: async (token) => {
        set({ loading: true });
        try {
            const response = await axios.get('https://resibo-react-1.onrender.com/user/logs', {
                headers: {
                    'Authorization': token
                }
            });
            
            const reversedLogs = response.data.logs.reverse();
            
            set({ activity: reversedLogs, loading: false });
            
        } catch (error:any) {
            set({ error: true, loading: false, title: error.response.data.title, message: error.response.data.msg});
        }
    },
    closeError: () => {
        set({ error: true, title: null, message: null})
    }
}))