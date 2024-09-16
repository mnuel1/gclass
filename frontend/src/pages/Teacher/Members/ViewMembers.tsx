import React, { useEffect }from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useMemberStore from '../../../store/Teacher/Member/useMemberStore'
import { useMemberQuery } from '../../../hooks/useMemberQuery'
import useModalStore from '../../../store/Teacher/Modal/useModalStore'
import { Authentication } from '../../../Auth/Authentication'

import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { ClassroomTypes } from '../../../types/classroomTypes'


import { Accordion } from '../../../components/Accordion/Accordion'
import { ErrorAlert } from '../../../components/Alert/ErrorAlert'
import { Spinner } from '../../../components/Spinner/spinner'


export const Members:React.FC = () => {
    // const { getUser } = Authentication
    const name = "Teacher name"
    // const [active, setActive] = useState("pending")
    const location = useLocation()
    const navigate = useNavigate()    
    const item : ClassroomTypes = location.state.item
    
    const { data, isSuccess, isError, isLoading } = useMemberQuery(item.class_id);
    const { member, getMember } = useMemberStore()
    const {    
        isErrorAlertVisible,
        showErrorAlert,
        hideErrorAlert } = useModalStore()
    // const handleFilter = (name : string) => {
    //     setActive(name)
    // }
       
    

    const handleAddMember = () => {
        navigate(`/teacher/class/${item.teacher_id}/members/new`, {state:{item}})
    }

    const handleRemoveMember = () => {
        navigate(`/teacher/class/${item.teacher_id}/members/remove`, {state:{item}})
    }

    useEffect(() => {
        
        if (isSuccess && data) {          
            getMember(data);
            console.log(data);
            
        }

        if (isError) {            
            showErrorAlert()
        }
    }, [data, isSuccess, getMember, isError]);

    return (
        <>
            {isErrorAlertVisible && <ErrorAlert isVisible={isErrorAlertVisible} onClose={hideErrorAlert} title={"Server Error"} 
            body={"An issue occurred. Please try again later. If the problem continues, please contact customer service. Thank you."}/>}
            <Spinner isLoading={isLoading || isError}>
                <div className='flex h-full w-full'>

                    <div className='w-[30%] bg-white '>
                        <ClassroomMenu item={item}/>
                    </div>

                    <div className='flex flex-col w-[70%] bg-white'>
                        <div className='flex md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0 border-b-2 border-gray-300 px-8 py-4'>
                        
                            <h1 className='text-2xl font-bold'>{item.name}'s Members</h1>
                            <div className='flex gap-2'>

                                <button 
                                    type='button' 
                                    className='p-2 rounded-md text-black flex 
                                    items-center gap-2 hover:bg-blue-200 border border-gray-300'
                                    onClick={handleAddMember}
                                    > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                    Add Member
                                </button>
                                <button 
                                    type='button' 
                                    className='p-2 rounded-md text-black flex 
                                    items-center gap-2 hover:bg-red-300 bg-red-200  '
                                    onClick={handleRemoveMember}
                                    > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>

                                    <span className='text-red-800'> Remove Member </span>
                                </button>

                            </div>
                            
                        </div>
                        

                        <div className='p-4 m-6 bg-white grow'>
                            {/* <div className='flex gap-4'>
                                <button onClick={() => handleFilter("pending")}className={active === 'pending' ? aactive : notActive}>Pending</button>
                                <button onClick={() => handleFilter("past")}className={active === 'past' ? aactive : notActive}>Past Due</button>
                                <button onClick={() => handleFilter("complete")}className={active === 'complete' ? aactive : notActive}>Completed</button>
                            </div> */}

                            <div className='flex flex-col gap-4 p-2'>
                                <div className='flex border-b-2 border-gray-300'>
                                    <span className='text-[11px] text-gray-400'>Teacher</span>                            
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-2 items-center'>
                                        <div className='rounded-full w-[40px] flex justify-center p-2 bg-[green] font-bold flex-none self-start'> T </div>
                                        <span className='font-semibold'>{name}</span>
                                    </div>

                                    <div>
                                        
                                    </div>
                                </div>
                                
                                
                                
                            </div>
                                                                                
                            <div className='border-b-2 border-gray-300 my-2 '/>                            
                            <Accordion name='Students'>

                                {member.length !== 0 ? (
                                    member.map((student, index) => (
                                    <>       
                                                            
                                        <div key={index} className='flex items-center justify-between my-2 p-2 '>
                                            <div className='flex gap-2 items-center '>
                                                <div className='rounded-full w-[40px] flex justify-center p-2 bg-[green] font-bold flex-none self-start'> T </div>
                                                <span className='font-semibold'>{student.fullname} </span>
                                            </div>

                                            <span className='text-xs text-gray-400'>{student.created_time}</span>
                                        </div>                                                                
                                    </>                      
                                ))): (
                                    <h1> No post yet...</h1>
                                )}
                            </Accordion>
                        </div>

                    </div>                
                </div>
            </Spinner>
        </>
    )

}

