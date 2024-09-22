
import React from 'react'
import { CalendarView } from '../../../components/Calendar/TeacherCalendar'

export const Calendar:React.FC = () => {

    return (
        <>

            <div className='bg-[white] h-full w-full'>
                <CalendarView/>
            </div>
        </> 
    )

}