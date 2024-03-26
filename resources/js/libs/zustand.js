import { create } from "zustand";

export const useSidebar = create((set) => ({
    isOpen: true,
    toggleShow: () => set((state) => ({ isOpen: !state.isOpen })),
}));
