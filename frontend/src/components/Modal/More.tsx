import React from 'react';
import { IoMdMore } from 'react-icons/io';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';
import { SuccessAlert } from '../Alert/SuccessAlert';
import useModalStore from '../../store/Modal/useModalStore';

export const MoreModal: React.FC<({id: string})> = ({id}) => {
  const {
    activeModalId,
    isSuccessAlertVisible,
    isDeleteModalOpen,
    isEditModalOpen,
    moreModalOpen,
    showAlert,
    hideAlert,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    openMoreModal,
    closeMoreModal
  } = useModalStore();
  
  const handleMoreModal = (id: string) => {
    openMoreModal(id);
    console.log(isEditModalOpen);
    
  };

  const handleDeleteModal = (id: string) => {
    openDeleteModal(id);
  };

  const handleEditModal = (id: string) => {
    openEditModal(id);
  };
  

  return (
    <>
      {isSuccessAlertVisible && (
        <SuccessAlert
          title="Deleted Successfully"
          body="The class was deleted successfully."
          isVisible={isSuccessAlertVisible}
          onClose={hideAlert}
        />
      )}

      <IoMdMore
        key={id}
        className="text-3xl cursor-pointer z-50 hover:bg-gray-200 rounded-full"
        onClick={() => handleMoreModal(id)}
      />

      {moreModalOpen === id && (
        <div className="w-[10rem] h-fit absolute right-2 top-[2rem] flex flex-col bg-white rounded-md p-2 shadow-lg border border-gray-200">
          <button
            type="button"
            className="flex items-center gap-2 h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-2 text-sm text-black"
            onClick={() => handleDeleteModal(id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit Class
          </button>
          <button
            type="button"
            className="flex items-center gap-2  h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-2 text-sm text-black"
            onClick={() => handleEditModal(id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

            <span className='text-red-600'> Delete Class </span>
          </button>
        </div>
      )}

          {isEditModalOpen === id && (
            <EditModal onClose={() => closeEditModal()} id={id} />
          )}

          {/* Show delete modal for this assignment if it's open */}
          {isDeleteModalOpen === id && (
            <DeleteModal onClose={() => closeDeleteModal()} id={id} />
          )}
    </>
  );
};
