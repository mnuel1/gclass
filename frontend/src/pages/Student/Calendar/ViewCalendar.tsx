
import React from 'react'
import { CalendarView } from '../../../components/Calendar/StudentCalendar'

export const StudentCalendar:React.FC = () => {

    return (
        <>

            <div className='bg-[white] h-full w-full'>
                <CalendarView/>
            </div>
        </> 
    )

}