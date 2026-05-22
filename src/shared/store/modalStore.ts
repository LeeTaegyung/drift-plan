import { ReactNode } from 'react';

import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  title: string;
  content: ReactNode | null;
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  title: '',
  content: null,
  openModal: (title, content) => set({ isOpen: true, content, title }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
