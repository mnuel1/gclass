import { create } from 'zustand'

type showMenuType = {
    showMenu: boolean
    setShowMenu: () => void
}

export const setShowMenuToggle = create<showMenuType>((set) => ({
    showMenu: false,
    setShowMenu: () => set((state) => ({showMenu: !state.showMenu}))
}))