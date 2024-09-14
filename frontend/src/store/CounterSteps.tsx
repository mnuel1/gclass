import {create} from 'zustand';

type StepsType = {
    step: number,
    setIncrementStep: () => void,
    setDecrementStep: () => void
}

export const useFormStore = create<StepsType>((set) => ({
    step: 0,
    setIncrementStep: () => set((state) => ({step: state.step + 1})),
    setDecrementStep: () => set((state) => ({step: Math.max(0, state.step - 1)}))
}))