import React from 'react';

type SpinnerProps = {
    children: React.ReactNode;
    isLoading: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({ children, isLoading }) => {
    return (
        <div className="flex flex-col bg-white relative h-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-40">
                    <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}
            {children}
        </div>
    );
};
