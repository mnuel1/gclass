import React, { useState } from "react"
import { ClassroomTypes } from "../../process/Classroom/classroomTypes";
import { Authentication } from "../../Auth/Authentication";

interface ModalProps {    
    onClose: () => void;
    onSubmit: (data: ClassroomTypes) => void;
    
}

export const ClassModal: React.FC<ModalProps> = ({ onClose,  onSubmit }) => {
    const { getID } = Authentication()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const teacher_id = getID()
    
    const handleSubmit = () => {
        const class_id = ""
        const class_string_id = ""               
        const  created_time = new Date()
        onSubmit({ name, description, teacher_id, class_id, class_string_id, created_time });
        onClose()
    };
    return(
        <>
           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                            <div className="flex flex-col rounded-lg">                     
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                               
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>

                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                
                                            <h1 className="text-lg font-bold leading-6 text-gray-900">Create Class</h1>
                                            <div className="mt-2 flex gap-4">
                                                <label
                                                htmlFor="name"
                                                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                                >
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        value={name} 
                                                        onChange={(e) => setName(e.target.value)} // Update state
                                                        placeholder="Name"
                                                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                                    />

                                                    <span
                                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                                    >
                                                        Name
                                                    </span>
                                                </label>
                                                <label
                                                htmlFor="description"
                                                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                                >
                                                    <input
                                                        type="text"
                                                        id="description"
                                                        value={description} // Bind input to state
                                                        onChange={(e) => setDescription(e.target.value)} // Update state
                                                        placeholder="Description"
                                                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                                    />

                                                    <span
                                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                                    >
                                                        Description
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={handleSubmit }
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={onClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                
                            

                            </div>
                        
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

