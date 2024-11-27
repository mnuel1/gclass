import React from 'react'
import { Outlet } from 'react-router-dom'

export const VideoLayout:React.FC = () => {
  return (
    <>
        <div className="flex flex-col min-h-screen items-center justify-center text-center text-white bg-[#454552] text-[calc(8px+2vmin)]">
            <Outlet />
        </div>
    </>
  )
}
