import { create } from "zustand"

export type ModalType = "medicineDetails" | "medicineEdit"

interface ModalStore {
    type: ModalType | null
    data: any
    isOpen: boolean
    onOpen: (type: ModalType, data?: any) => void
    onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}))