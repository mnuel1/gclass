import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminMenu } from '../components/Navbar/AdminMenu'

export const AdminLayout:React.FC = () => {
  return (
    <>
        
        <AdminMenu>
            <Outlet />
        </AdminMenu>
    </>
  )
}
