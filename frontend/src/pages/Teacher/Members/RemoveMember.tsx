import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Accordion } from '../../../components/Accordion/Accordion'
import { MdDeleteOutline } from 'react-icons/md'
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'
import { Member } from '../../../process/Member/memberType'
import { ConfirmModal } from '../../../components/Modal/ConfirmModal'
import { useRemoveMember } from '../../../process/Member/useMemberQuery'

export const RemoveMember: React.FC = () => {
    const location = useLocation()
    const classroom: ClassroomTypes = location.state.classroom
    const initialMembers: Member[] = location.state.member

    const [confirm, setConfirm] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [members, setMembers] = useState<Member[]>(initialMembers)
    const [removedMembers, setRemovedMembers] = useState<Member[]>([])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleAddMembers = (newMember: Member) => {
        if (!members.some(member => member.student_id === newMember.student_id)) {
            setMembers([...members, newMember])
        }
        setSearch('')
    }

    const handleRemoveMember = (student_id: string) => {
        const memberToRemove = members.find(member => member.student_id === student_id)
        if (memberToRemove) {
            setMembers(members.filter(member => member.student_id !== student_id))
            setRemovedMembers([...removedMembers, memberToRemove])
        }
    }

    const removeMemberMutation = useRemoveMember()
    const handleSave = () => {
        
        const data = {
            class_id: classroom.class_id,            
            members: removedMembers
        }
        removeMemberMutation.mutate(data)
        setConfirm(false)
    }

    return (
        <>
            {confirm && <ConfirmModal id='' onClose={() => setConfirm(false)} onConfirm={handleSave} />}
            <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                <h1 className='text-2xl font-bold'>{members.length <= 1 ? 'Remove Member' : "Remove Members"}</h1>
            </div>

            <div className='p-4 m-6 flex flex-col gap-2'>
                <div className='flex flex-col gap-6 overflow-hidden'>
                    <div className='flex items-center gap-4 border bg-gray-200 rounded-lg p-4'>
                        <label className="font-bold">Enter name: </label>
                        <div className='flex items-center gap-2 w-fit relative'>
                            <input type="text" value={search} onChange={handleSearchChange} className='outline-0 rounded-sm p-2 border border-gray-200' />

                            <div className={search.length === 0 ? 'hidden' : 'absolute right-0 top-10 w-full bg-white z-50 shadow-lg border border-gray-200'}>
                                {initialMembers
                                    .filter(student => student.fullname.toLowerCase().includes(search.toLowerCase()))
                                    .map((student, index) => (
                                        <div key={index} className='hover:bg-gray-200 p-4 border-b border-gray-100'>
                                            <button
                                                type='button'
                                                onClick={() => handleAddMembers(student)}
                                            >
                                                {student.fullname}
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='bg-white overflow-y-auto'>
                        <Accordion name='Members'>
                            {members.length === 0 ? (
                                <div className='text-xl my-2 p-4'> No members yet</div>
                            ) : (
                                members.map((member, index) => (
                                    <div key={index} className='flex gap-2 p-4'>
                                        <button onClick={() => handleRemoveMember(member.student_id)} className=''>
                                            <MdDeleteOutline className='text-[red] text-2xl' />
                                        </button>
                                        <span className='text-xl'>{member.fullname}</span>
                                    </div>
                                ))
                            )}
                        </Accordion>
                    </div>

                    <div className='border-t border-gray-200 p-2'>
                        <button
                            onClick={() => setConfirm(true)}
                            type='button'
                            className='bg-red-500 p-2 rounded-md w-[10rem] text-white hover:bg-red-600'>
                            Remove
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
