import { create } from 'zustand'

type registerBuyer = {
    registerBuyerType: {
        name: string;
        tin: string;
        contact_number: string;
        address: string;
        individual: number;
        business_name?: string;
    }
    setRegisterBuyer: (data: Partial<registerBuyer['registerBuyerType']>) => void;
}

export const useRegisterBuyerStore = create<registerBuyer>((set) => ({
    registerBuyerType: {
        name: '',
        tin: '',
        contact_number: '',
        address: '',
        individual: 0,
        business_name: '',
    },
    setRegisterBuyer: (data) => set((state) => ({registerBuyerType: {...state.registerBuyerType, ...data}}))
}))