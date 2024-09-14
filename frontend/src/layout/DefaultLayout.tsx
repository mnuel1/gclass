import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar/Navbar'

export const DefaultLayout:React.FC = () => {
  return (
    <>
        <Navbar />      
        <Outlet />
        
    </>
  )
}
