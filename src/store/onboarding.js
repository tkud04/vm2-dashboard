import create from 'zustand'

export const useOnboardingStore = create((set,get) => ({
    hasVbank: false, // has a vbank account or not
    isRegistered: false, //new registration or not
    hasOperators: false, //has other operators or not
    directors: [],
    shareholders: [],
    operators: [],
    setHasVbank: (val) => set({ hasVbank: val }),
    setIsRegistered: (val) => set({ isRegistered: val }),
    setHasOperators: (val) => set({ hasOperators: val }),
}))
