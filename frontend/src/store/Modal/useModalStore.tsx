// src/stores/useModalStore.ts
import { create } from 'zustand';

interface ModalState {
  activeModalId: string | null; // Track which modal is active
  isSuccessAlertVisible: boolean;
  isDeleteModalOpen: string | null; // Store id of the delete modal
  isEditModalOpen: string | null;   // Store id of the edit modal
  moreModalOpen: string | null;     // Store id of the more modal
  
  showAlert: () => void;
  hideAlert: () => void;
  
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;

  openEditModal: (id: string) => void;
  closeEditModal: () => void;

  openMoreModal: (id: string) => void;
  closeMoreModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModalId: null, // No modal open by default
  isSuccessAlertVisible: false,
  isDeleteModalOpen: null,
  isEditModalOpen: null,
  moreModalOpen: null,

  showAlert: () => set({ isSuccessAlertVisible: true }),
  hideAlert: () => set({ isSuccessAlertVisible: false }),
  
  openDeleteModal: (id: string) => set({ isDeleteModalOpen: id }),
  closeDeleteModal: () => set({ isDeleteModalOpen: null }),

  openEditModal: (id: string) => set({ isEditModalOpen: id }),
  closeEditModal: () => set({ isEditModalOpen: null }),

  openMoreModal: (id: string) => set({ moreModalOpen: id }),
  closeMoreModal: () => set({ moreModalOpen: null }),
}));

export default useModalStore;
