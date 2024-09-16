import React, { useEffect } from "react"
interface Props {
    isVisible: boolean
    onClose: () => void;
    title: React.ReactNode
    body: React.ReactNode
}

export const ErrorAlert: React.FC<Props> = ({isVisible, onClose, title, body}) => {
    useEffect(() => {
        if (!isVisible) return;
    
        // // Set up a timer to automatically close the ad
        // const timer = setTimeout(() => {
        //   onClose();
        // }, 10000);
    
        // // Clear the timer if the component is unmounted or if isVisible changes
        // return () => clearTimeout(timer);
      }, [isVisible, 10000, onClose]);
    
    return (
        <>
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 max-w-md z-50">
                <div role="alert" className="rounded-xl border border-red-100 bg-red-200 p-4">
                    <div className="flex items-start gap-4">
                        <span className="text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                        </span>

                        <div className="flex-1">
                        <strong className="block font-medium text-gray-900"> {title} </strong>

                        <p className="mt-1 text-sm text-gray-700">{body}</p>
                        </div>

                        <button onClick={onClose} className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}