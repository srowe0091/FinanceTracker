import { create } from 'zustand'
import { curry } from 'lodash/fp'

export const useModalStore = create(set => ({
  activeModal: null,
  openModal: name => () => set({ activeModal: name }),
  closeModal: () => set({ activeModal: null }),
  toggleModal: curry((name, bool) => {
    if (!name) return
    set({ activeModal: bool ? name : null })
  })
}))

export const closeModal = () => useModalStore.setState({ activeModal: null })
export const openModal = name => () => useModalStore.setState({ activeModal: name })
