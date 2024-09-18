import { create } from 'zustand';

interface ModalState {
  isLoading: boolean
  activeModalId: string | null; 
  isSuccessAlertVisible: boolean;
  isErrorAlertVisible: boolean;
  isDeleteModalOpen: string | null; 
  isEditModalOpen: string | null;   
  moreModalOpen: string | null;     
  
  classModalOpen: boolean;
  joinModalOpen: boolean;

  showSuccessAlert: () => void;
  hideSuccessAlert: () => void;

  showErrorAlert: () => void;
  hideErrorAlert: () => void;
  
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;

  openEditModal: (id: string) => void;
  closeEditModal: () => void;

  openMoreModal: (id: string) => void;
  closeMoreModal: () => void;

  openClassModal: () => void;
  closeClassModal: () => void;

  openJoinModal: () => void;
  closeJoinModal: () => void;

  startLoading: () => void;
  stopLoading: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isLoading: false,
  activeModalId: null, // No modal open by default
  isSuccessAlertVisible: false,
  isErrorAlertVisible: false,
  isDeleteModalOpen: null,
  isEditModalOpen: null,
  moreModalOpen: null,
  classModalOpen: false,
  joinModalOpen: false,

  showSuccessAlert: () => set({ isSuccessAlertVisible: true }),
  hideSuccessAlert: () => set({ isSuccessAlertVisible: false }),
  
  showErrorAlert: () => set({ isErrorAlertVisible: true }),
  hideErrorAlert: () => set({ isErrorAlertVisible: false }),
  
  openDeleteModal: (id: string) => set({ isDeleteModalOpen: id }),
  closeDeleteModal: () => set({ isDeleteModalOpen: null }),

  openEditModal: (id: string) => set({ isEditModalOpen: id }),
  closeEditModal: () => set({ isEditModalOpen: null }),

  openMoreModal: (id: string) => set({ moreModalOpen: id }),
  closeMoreModal: () => set({ moreModalOpen: null }),

  openClassModal: () => set({ classModalOpen: true }),
  closeClassModal: () => set({ classModalOpen: false }),

  openJoinModal: () => set({ joinModalOpen: true }),
  closeJoinModal: () => set({ joinModalOpen: false }),


  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));

export default useModalStore;
