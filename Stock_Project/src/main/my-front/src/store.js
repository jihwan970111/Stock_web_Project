import { create } from 'zustand'

const useUsernameStore = create((set) => ({
  username: 'unknown',
  email: 'unknown',
  updateUsername: (newName, newEmail) => set({
    username: newName,
    email: newEmail,
  }),
}))

export default useUsernameStore;
