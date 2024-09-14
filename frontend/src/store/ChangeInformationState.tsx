import { create } from 'zustand'

type editInformationType = {
    isModalVisible: boolean,
    updateInfoModalState: (state: boolean) => void,
}

export const useModalInformationStore = create<editInformationType>((set) => ({
    isModalVisible: false,
    updateInfoModalState: (state) => set(() => ({ isModalVisible: state }))
}));