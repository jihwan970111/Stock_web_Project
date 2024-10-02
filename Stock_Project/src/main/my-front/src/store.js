import { create } from 'zustand'

const useUsernameStore = create((set) => ({
  username: 'unknown',
  updateUsername: (newName) => set({username: newName}),
}))

export default useUsernameStore