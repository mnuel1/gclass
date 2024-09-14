import { create } from 'zustand'

type modalStoreType = {
    isModalVisible: boolean,
    updateModalState: () => void,
}

export const useModalPasswordStore = create<modalStoreType>((set) => ({
    isModalVisible: false,
    updateModalState: () => set((state) => ({isModalVisible: !state.isModalVisible})),
}))