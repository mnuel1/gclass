import { create } from 'zustand'

type modalBuyerStoreType = {
    isModalVisible: boolean,
    updateModalState: () => void,
}

export const useBuyerModalPasswordStore = create<modalBuyerStoreType>((set) => ({
    isModalVisible: false,
    updateModalState: () => set((state) => ({isModalVisible: !state.isModalVisible})),
}))