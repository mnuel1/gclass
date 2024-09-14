import React from 'react'
import { Outlet } from 'react-router-dom'
import { StudentMenu } from '../components/Navbar/StudentMenu'

export const StudentLayout:React.FC = () => {
  return (
    <>
        <StudentMenu>
          <Outlet />
        </StudentMenu>
    </>
  )
}
