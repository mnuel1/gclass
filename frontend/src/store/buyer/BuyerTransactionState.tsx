import { create } from 'zustand'
import axios from 'axios';


type productsType = {
    id: number;
    sku: string;
    unit: string;
    product_name: string;
    price: number;
    vat_amount: number;
    vat_inclusive: number;
    status: string;
  }

type buyerTransactionStore = {
    products: productsType[] | null;
    error: boolean;
    title: string | null;
    comment: string | null;
    isLoading: boolean;
    fetchData: (token: string) => void;
    closeError: () => void;
}


export const useBuyerTransactionStore = create<buyerTransactionStore>((set) => ({
    products: [],
    error: false,
    title: null,
    comment: null,
    isLoading: false,
    fetchData: async (token: string | null) => {
        set({isLoading: true});
        try{
            const response = await axios.get('https://resibo-react-1.onrender.com/user/products/get', {
                headers: {
                    'Authorization': token
                }
            })
            const products = await response.data.products;
            set({isLoading: false, products});
        }
        catch(err: any){
            const errorTitle = err.response?.data?.title || 'Error';
            const errorMsg = err.response?.data?.message || 'An error occurred';

            set({isLoading: false, error: true, title: errorTitle, comment: errorMsg});
        }
    },
    closeError: () => set({error: false, title: null, comment: null})
}))


type buyerTransactionDataType = {
    id: number;
    unit: string;
    product_name: string;
    quantity: number;
    price: number;
    total_amount: number;
    
}

type buyerTransactionProps = {
    data: buyerTransactionDataType[];
    insertData: (data: buyerTransactionDataType) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
    updateAmount: (updatedData: any) =>void;
    clearData: () => void;
}

export const useBuyerTransactionTableStore = create<buyerTransactionProps>((set) => ({
    data: [{
        "id": 6,
        "price": 10000,
        "product_name": "Professional Fee",
        "quantity": 1,
        "total_amount": 0,
        "unit": "unit"
      }],
    insertData: (newData) => 
    set((state) => {
        const existingData = state.data.find(item => item.id === newData.id);
        newData.quantity = 0
        newData.total_amount = 0
        if (!existingData) {
            return {
                data: [...state.data, newData]
            };
        }
        return state;
    }),
    incrementQuantity: (id) => set((state) => ({
        data: state.data.map((item) => item.id === id ? {...item, 
            quantity: item.quantity + 1, 
            total_amount: item.price * (item.quantity + 1)} : item)
    })),
    decrementQuantity: (id) => set((state) => ({
        data: state.data.map((item) => item.id === id ? {...item, 
            quantity: Math.max(0, item.quantity - 1), 
            total_amount: Math.max(0, item.price * (item.quantity - 1))} : item)
    })),
    updateAmount: (updatedData: any) =>
        set(() => ({
          data: updatedData,
    })),
    clearData: () => set({ data: [] })
}))

