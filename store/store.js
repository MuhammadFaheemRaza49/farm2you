import { create } from 'zustand'

export const useUserStore = create((set) => ({
    isLogin: false,
    username: "",
    role: "",
    attachments: [],
    setAttachments: (attachment) => {
        set((state) => ({
            attachments: [...state.attachments, attachment],
        }));
    },
    resetAttachments: () => set({ attachments: [] }),
    setIsLogin: (newState) => set({ isLogin: newState }),
    setUsername: (newState) => set({ username: newState }),
    setRole: (newState) => set({ role: newState })
}))