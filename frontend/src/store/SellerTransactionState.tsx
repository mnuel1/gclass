import { create } from 'zustand'

type modalType = {
    isVisible: boolean;
    setIsVisible: () => void;
}

export const useProductModalState = create<modalType>((set) => ({
    isVisible: false,
    setIsVisible: () => set(state => ({isVisible: !state.isVisible}))
}))

type buyerInfoType = {
    seller_name: string, 
    seller_signature: string, 
    buyer_name: string, 
    business_name: string, 
    tin: string,
    tin1: string, 
    tin2: string, 
    tin3: string, 
    contact: string, 
    address: string, 
    discount: string, 
    buyer_signature: string 
}

type buyerInfoProps = {
    buyerInfo: buyerInfoType;
    setBuyerInfo: (data: buyerInfoType) => void;
}


export const useBuyerInfoStore = create<buyerInfoProps>((set) => ({
    buyerInfo: {
        seller_name: '',
        seller_signature: '',
        buyer_name: '',
        business_name: '',
        tin: '',
        tin1: '',
        tin2: '',
        tin3: '',
        contact: '',
        address: '',
        discount: '',
        buyer_signature: ''
    },
    setBuyerInfo: (data) => {
        const { tin1, tin2, tin3, ...rest } = data;
        const combinedTin = `${tin1}-${tin2}-${tin3}`;
        set({ buyerInfo: { ...rest, tin: combinedTin, tin1: tin1, tin2: tin2, tin3: tin3, } });
    }
    
}))

