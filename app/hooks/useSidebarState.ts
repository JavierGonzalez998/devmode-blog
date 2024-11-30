import { create } from 'zustand'

type SidebarState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useSidebarState = create<SidebarState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))

