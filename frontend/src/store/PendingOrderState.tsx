import axios from 'axios';
import { create } from 'zustand'

type PendingOrderType = {
    buyer_name: string;
    TempCustomer : {
        name: string;
        tin: string;
    };
    createdAt: string;
    customerID: number;
    discount: number;
    id: number;
    tin: string;
    isRegistered: boolean;
    net_sales: number;
    salesInvoice: string;
    status: string;
    tempCustomerID: number;    
    updatedAt: string;
    vat_amount: number;    
    vat_output: number;
}

type PendingOrderState = {
    data: PendingOrderType[];
    loading: boolean;
    error: boolean;
    title: string | null;
    comment: string | null;
    fetchData: (token: string) => void;
    approvedVoucher: (id: number, status: string, token: string) => void;
    closeError: () => void;
}

export const usePendingOrderStore = create<PendingOrderState>((set) => ({
    data: [],
    loading: false,
    error: false,
    title: null,
    comment: null,
    fetchData: async (token) => {
        set({ loading: true })
        try {
            const response = await axios.get(`https://resibo-react-1.onrender.com/receipt/pending`, {
                headers: {
                    'Authorization': token
                }
            });
            if (response.status === 200) {
                const { receipts } = response.data
                set({ data: receipts, loading: false })
            }
        } catch (error : any) {
            set({ error: true, loading: false, title: error.response.data.title, comment: error.response.data.msg})
        }
    },
    approvedVoucher: async (id, status, token) => {
        set({ loading: true })
        try {
            const response = await axios.patch(`https://resibo-react-1.onrender.com/transaction/update/receipt`, {
                id: id,
                status: status
            },
            {
                headers: {
                    'Authorization': token
                }
            });
                set((state) => ({
                    loading: false,
                    data: state.data?.filter((receipt) => receipt.id !== id)
                }))

                set({loading: false, error: true, title: response.data.title, comment: response.data.msg})
        } catch (error : any) {
            set({ error: true, loading: false, title: error.response.data.title, comment: error.response.data.msg})
        }
    },
    closeError: () => set({ error: false, title: null, comment: null })
}))