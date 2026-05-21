import { create } from 'zustand';

interface AlertModalState {
  title: string;
  desc?: string;
  isOpen: boolean;
  onAction: () => void;
  onCancel?: () => void;
}

interface AlertModalStore {
  alertModal: AlertModalState;
  openAlertModal: (alertModal: Omit<AlertModalState, 'isOpen'>) => void;
  closeAlertModal: (isOpen: boolean) => void;
}

const initAlertModal = {
  title: '',
  desc: '',
  isOpen: false,
  onAction: () => {},
};

export const useAlertModalStore = create<AlertModalStore>((set) => ({
  alertModal: initAlertModal,
  openAlertModal: (alertModal) =>
    set({
      alertModal: { ...alertModal, isOpen: true },
    }),
  closeAlertModal: (isOpen) =>
    set({
      alertModal: { ...initAlertModal, isOpen },
    }),
}));
