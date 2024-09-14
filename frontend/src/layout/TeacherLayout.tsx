import React from 'react'
import { Outlet } from 'react-router-dom'
import { TeacherMenu } from '../components/Navbar/TeacherMenu'

export const TeacherLayout:React.FC = () => {
  return (
    <>
        <TeacherMenu>
            <Outlet />
        </TeacherMenu>
    </>
  )
}
