import { create } from 'zustand'

type sellerTransactionDataType = {
    id: number;
    unit: string;
    product_name: string;
    quantity: number;
    price: number;
    total_amount: number;
    
}

type sellerTransactionProps = {
    data: sellerTransactionDataType[];
    insertData: (data: sellerTransactionDataType) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
    clearData: () => void;
}

export const useTransactionTableStore = create<sellerTransactionProps>((set) => ({
    data: [],
    insertData: (newData) => 
    set((state) => {
        const existingData = state.data.find(item => item.id === newData.id);     
        newData.quantity = 0
        newData.total_amount = 0
        if (!existingData) {
            newData.quantity = 0
            newData.total_amount = 0
            return {
                data: [...state.data, newData]
            };
        }
        console.log(state);
        
        return state;
    }),
    incrementQuantity: (id) => set((state) => ({
        data: state.data.map((item) => item.id === id ? {...item, quantity: item.quantity + 1, total_amount: item.price * (item.quantity + 1)} : item)
    })),
    decrementQuantity: (id) => set((state) => ({
        data: state.data.map((item) => item.id === id ? {...item, quantity: Math.max(0, item.quantity - 1), total_amount: Math.max(0, item.price * (item.quantity - 1))} : item)
    })),
    clearData: () => set({ data: [] })
}))