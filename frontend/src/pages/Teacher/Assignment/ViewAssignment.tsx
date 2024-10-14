import React, { useState, useEffect } from 'react'
import { SERVER } from '../../../process/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'
import { AssignmentType } from '../../../process/Assignment/assignmentType'
import useMemberStore from '../../../process/Member/useMemberStore'
import useModalStore from '../../../process/Modal/useModalStore'
import { useEditAssignment, useDeleteAssignment, useGradeAssignment } from '../../../process/Assignment/useAssignmentQuery'
import { Member } from '../../../process/Member/memberType'
import { useMemberQuery } from '../../../process/Member/useMemberQuery'
import { Accordion } from '../../../components/Accordion/Accordion'
import { DeleteAssignmentModal } from '../../../components/Modal/DeleteAssignmentModal'
import { FailedToast } from '../../../components/Toast/FailedToast'

interface ErrorsState {
    name?: string,        
    instructions?: string,
    attachment?: string;
    points?: string;
    date?: string;
    time?: string;
    student_ids?: string[]
  
}
const activeStyle = "rounded-md border-2 border-blue-200 p-2 text-black"
const notActiveStyle = "rounded-md border border-gray-200 hover:border-blue-200 p-2 text-black"


export const ViewAssignment:React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()    
    const classroom : ClassroomTypes = location.state.classroom
    const ass : AssignmentType = location.state.assignment
    const {member, getMember} = useMemberStore()
    const [active, setActive] = useState("Turned In")
    const [search, setSearch] = useState<string>('')
    const [members, setMembers] = useState(ass.students)
    const [page, setPage] = useState(1)    
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)
    const [grades, setGrades] = useState<any>({});

    const [form,setForm] = useState({
        name: ass.name,
        instructions: ass.instruction,
        attachment: ass.attachment,
        points: ass.points,    
        class_id: ass.class_id,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5)
    })
    
    const { data, isSuccess, isError, isLoading } = useMemberQuery(classroom.class_id);
    const [errors, setErrors] = useState<ErrorsState>({});
    const {        
        startLoading,
        stopLoading } = useModalStore()
    
    useEffect(() => {
        if (isLoading){
            startLoading()
        } else {
            stopLoading()
        }
        if (isSuccess && data) {          
            getMember(data);           
        }

        if (isError) {            
            FailedToast("Something went wrong!")
        }
    }, [data, isSuccess, getMember, isError]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'file') {            
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files ? fileInput.files[0] : null;
            setForm(prevForm => ({
                ...prevForm,
                ["attachment"]: file,
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const handleAddMembers = (memberr: Member) => {

        if (!members?.some(member => member.student_id === memberr.student_id)) {
            setMembers([...(members ?? []), memberr]);
        }
        setSearch('')
    } 

    const handleRemoveMember = (student_id: string) => {
        setMembers(members?.filter(member => member.student_id !== student_id))                
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (form.name.length <= 0) {
            newErrors.name = "Title is required.";
        }

        if (form.points.length <= 0) {
            newErrors.points = "Title is required.";
        }

        if (form.time.length <= 0) {
            newErrors.time = "Time is required.";
        }

        if (form.date.length <= 0) {
            newErrors.date = "Date is required";
        }

        if(members && members.length <= 0) {
            newErrors.student_ids = "You need to assigned a student to this assignment ";
        }
        
        return newErrors;
    };

    
    const editAssignmentMutation = useEditAssignment()
    const createTimestamp = () => {
        
        const formattedDate = form.date.replace(/\//g, '-'); 
        const dateTimeString = `${formattedDate}T${form.time}`; 
        const date = new Date(dateTimeString); 
            
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
  
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
                
        if (Object.keys(validationErrors).length === 0) {         
       
            
            const data = {                
                assignment_id: ass.assignment_id,
                class_id: ass.class_id,
                name: form.name,
                instruction: form.instructions,
                
                points: form.points,
                start_date: "",
                due_date: `${createTimestamp()}`,
                modified_time: "",
                formatted_start_date: "",
                students: members,
                student_ids: members,
                past_student_ids: ass.students
            }
                                                
            const formData = new FormData();
            formData.append('assignment_id', ass.assignment_id); 
            formData.append('attachment', form.attachment);

            try {
                if (form.attachment && form.attachment instanceof File) {
                    const response = await fetch(`${SERVER}/teacher/upload/assignment`,
                        {
                            method:"POST",
                            body: formData
                        }
                    )
                                    
                    if (response.status === 200) {                    
                        editAssignmentMutation.mutate(data)
                        window.location.reload()
                        navigate(-1)                        
                    } else {
                        FailedToast("Something went wrong!")
                    }
                } else {
                    editAssignmentMutation.mutate(data)
                    window.location.reload()
                    navigate(-1)
                }
               
            } catch (error) {
                FailedToast("Something went wrong!")
            }

        } else {
            setErrors(validationErrors);
        }

    }

    const handleEditAssignment = () => {
        setEdit(prev => !prev)
    }
    const deleteAssignmentMutation = useDeleteAssignment()
    const handleRemoveAssignment = (assignment_id : string) => {
       
        deleteAssignmentMutation.mutate(assignment_id)
        window.location.reload()       
        navigate(-1);
    }

    const handleFilter = (status: string) => {
        setActive(status)
    }
    const handleGradeChange = (e: any, student_id: string) => {
        const { value } = e.target;
        setGrades({
            ...grades,
            [student_id]: value, // Update the grade for the specific student
        });
    };
    const gradeAssignmentMutation = useGradeAssignment()
    const handleGradeAssignment = (student_id:string) => {
        const grade = grades[student_id]; 
        if (!grade) {
            FailedToast("Enter a grade first before returning");
            return;
        }
        const data  = {
            "student_id" : student_id,
            "grade" : grade,
            "assignment_id" : ass.assignment_id
        }
        gradeAssignmentMutation.mutate(data)                
        console.log(`Submitting grade ${grade} for student ${student_id}`);
            
    };
    const filteredStudents = ass.students?.filter(student => student.assignment_status === active);
    return (
        <>
            {del && <DeleteAssignmentModal 
                onClose = {() => setDel(false)}  
                onSubmit={handleRemoveAssignment} 
                assignment_id={ass.assignment_id}/>}
            <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
                    <div className='flex gap-4 items-end'>
                        <h1 className='text-2xl font-bold'>{classroom.name}'s Assignment</h1>
                        <div className='border-l-2 border-black-600 text-gray-50'>-</div>
                        <span 
                        onClick={() => page === 1 ? setPage(2) : setPage(1)}                            
                        className='font-semibold text-gray-700 hover:text-blue-700 
                        cursor-pointer hover:border-b border-blue-200 '>
                            {page === 1 ? 'Classwork' : 'Assignment'}
                        </span>
                    </div>
                    
                    <div className='flex gap-2'>
                        <button 
                            type='button' 
                            className='p-2 rounded-md text-black flex 
                            items-center gap-2 hover:bg-blue-200 border border-gray-300'
                            onClick={handleEditAssignment}
                            > 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                            stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Edit
                        </button>
                        <button 
                            type='button' 
                            className='p-2 rounded-md text-black flex 
                            items-center gap-2 hover:bg-red-300 bg-red-200  '
                            onClick={() => setDel(true)}
                            >                    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                            stroke="currentColor" className="size-6 text-red-800">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            
                        </button>
                    </div>
              
            </div>
            <div className='grow overflow-y-auto h-full pb-12'>

             
            {page === 1 ? (
                <form action="" onSubmit={handleSubmit}>            
                    <div className='h-full p-4 m-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-sm text-gray-500'>Title <span className='text-red-700'>*</span> </span>
                            <div>                                
                                <input
                                    disabled = {edit ? false : true} 
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                        </div>

                        <div>

                            <span className='text-sm text-gray-500'>Instruction</span>
                            <textarea
                                disabled = {edit ? false : true}                         
                                name="instructions"
                                value={form.instructions}
                                onChange={handleChange}
                                className={`w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm 
                                ${!edit ? "text-gray-400" : "text-black"} bg-white`}
                                placeholder="Enter instructions"
                            />   
                        </div>

                        <div className='flex flex-col gap-2'>
                            {ass.attachment && !edit && (                       
                                <Accordion name='Attachment Preview'>
                                    {ass.attachment.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                        <img 
                                            src={`${SERVER}/${ass.attachment}`} 
                                            alt={`Preview of ${ass.assignment_id}`} 
                                            style={{ width: '100%', maxWidth: '600px', height: 'auto' }} 
                                        />
                                    ) : ass.attachment.match(/\.pdf$/i) ? (
                                        <iframe 
                                            src={`${SERVER}/${ass.attachment}`} 
                                            width="100%" 
                                            height="600px" 
                                            title="PDF Preview"
                                        />
                                    ) : (
                                        <p>Preview not available for this file type.</p>
                                    )}                        
                                </Accordion>
                            )}
                            {!ass.attachment || edit && 
                                <>
                                    <span className='text-xs italic text-gray-400'>Add files if neccessary</span>
                                    <input
                                        disabled = {edit ? false : true}  
                                        type="file"                            
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                    {errors.attachment && <p className="text-red-500 text-sm">{errors.attachment}</p>}
                                </>
                            }
                            
                        </div>

                        <div>                        
                            <div className='flex items-center gap-4 border border-gray-200 rounded-lg p-4'>
                                <label className="font-bold">Enter name: </label>                            
                                <div className='flex items-center gap-2  w-fit relative'>
                                    
                                    <input 
                                        disabled = {edit ? false : true} 
                                        type="text" 
                                        value={search} 
                                        onChange={handleSearchChange} 
                                        className='outline-0 rounded-sm p-2'/>

                                    <div className={search.length === 0 ? 'hidden' : 'absolute right-0 top-10 w-full bg-white z-50 shadow-lg border border-gray-200'}>
                                        {member
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
                        
                            
                            <Accordion name='Added Members'>
                                {!members?.length ? (
                                        <div className='text-xl my-2 p-4 '> No members yet</div>
                                    ) : (
                                        
                                        members.map((member, index) => (
                                            <>
                                                <div key={index} className='flex gap-2 p-4 '>
                                                    <button type="button" disabled = {edit ? false : true}  onClick={() => handleRemoveMember(member.student_id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>                                                
                                                    </button>
                                                    <span className='text-md'>{member.fullname}</span>
                                                </div>
                                            </>
                                        ))
                                    )}
                            </Accordion>
                            {errors.student_ids && <p className="text-red-500 text-sm">{errors.student_ids}</p>}
                            <span className='text-sm text-gray-400 italic'>
                                By default, all students are added in this assignment                        
                            </span>

                        </div>    
                        <div className='flex flex-col md:flex-row items-center gap-4'>

                            <div className='flex flex-col gap-2'>
                                <span className='text-sm text-gray-500'>Points <span className='text-red-700'>*</span> </span>
                                <input
                                    disabled = {edit ? false : true} 
                                    type="number"
                                    name="points"
                                    value={form.points}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"                                
                                />
                                {errors.points && <p className="text-red-500 text-sm">{errors.points}</p>}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-sm text-gray-500'>Due Date <span className='text-red-700'>*</span> </span>
                                    <div className='flex max-w-md gap-2'>
                                    <div>
                                        <input
                                            disabled = {edit ? false : true} 
                                            type="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"                                
                                        />
                                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                    </div>
                                    <div>
                                    <input
                                        disabled = {edit ? false : true} 
                                        type="time"
                                        name="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter email"
                                    />
                                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                                    </div>
                                </div>
                                                    
                            </div>
                                            
                        </div>
                                                                        
                        <button
                        disabled = {edit ? false : true} 
                        type='submit' 
                        className={`${edit ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-500 hover:bg-gray-500'} 
                        bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600 mt-2`}> 
                        Save </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className='h-full p-4 m-6 flex flex-col gap-4 overflow-y-auto pb-12'>
                        <div className='flex gap-4'>                        
                            <button onClick={() => handleFilter("Turned In")} className={active === 'Turned In' ? activeStyle : notActiveStyle}>Turned In</button>
                            <button onClick={() => handleFilter("Pending")} className={active === 'Pending' ? activeStyle : notActiveStyle}>Pending</button>
                            <button onClick={() => handleFilter("Late Turned In")} className={active === 'Late Turned In' ? activeStyle : notActiveStyle}>Late Turned In</button>
                            <button onClick={() => handleFilter("Not Turned In")} className={active === 'Not Turned In' ? activeStyle : notActiveStyle}>Not Turned In</button>
                            <button onClick={() => handleFilter("Returned")} className={active === 'Returned' ? activeStyle : notActiveStyle}>Returned</button>
                        </div>
                        {filteredStudents?.map((student, index) => (
                            <div className='border border-gray-200'>                           
                                <Accordion key={index} name={`${student.fullname} Work`}>
                                
                                    <div className='px-4 border-t border-gray-200 mt-2 py-3'>
                                        {student.assignment_status === 'Pending' || student.assignment_status === 'Not Turned In' ? (
                                            <h1>{student.fullname} doesn't have work yet</h1>
                                        ) : (
                                            <>                                            
                                                {student.attachments.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                    <>
                                                        <div className='flex gap-6 justify-between mb-2'>
                                                            <div className='flex items-end gap-2'>
                                                                <span className='text-sm text-gray-500'>Grade:</span>
                                                                <input 
                                                                    type="number" 
                                                                    name={`grading-${student.student_id}`}
                                                                    value={grades[student.student_id] || ''}
                                                                    onChange={(e) => handleGradeChange(e, student.student_id)}
                                                                    className="border border-200 rounded-md"
                                                                />

                                                            </div>
                                                            
                                                            <div className='flex gap-4'>
                                                                <button onClick={() => handleGradeAssignment(student.student_id)} className='border-blue-200 border p-2 
                                                                rounded-lg hover:bg-blue-400 hover:border-blue-400 hover:text-white'>Return</button>
                                                                <a 
                                                                    href={`${SERVER}/${student.attachments}`} 
                                                                    download 
                                                                    className="rounded-lg border border-gray-200 bg-blue-400 text-white hover:bg-blue-500
                                                                    p-2"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                    </svg>

                                                                </a>
                                                            </div>
                                                        </div>
                                                        
                                                        <img 
                                                            src={`${SERVER}/${student.attachments}`} 
                                                            alt={`Preview of ${student.student_id}`} 
                                                            style={{ width: '100%', maxWidth: '600px', height: 'auto' }} 
                                                        />
                                                        
                                                        
                                                    </>
                                                ) : student.attachments.match(/\.pdf$/i) ? (
                                                    <>
                                                        <div className='flex gap-6 justify-between mb-2'>                                                        
                                                            <div className='flex items-end gap-2'>
                                                                <span className='text-sm text-gray-500'>Grade:</span>
                                                                <input 
                                                                    type="number" 
                                                                    name={`grading-${student.student_id}`}
                                                                    value={grades[student.student_id] || ''}
                                                                    onChange={(e) => handleGradeChange(e, student.student_id)}
                                                                    className="border border-200 rounded-md"
                                                                />

                                                            </div>
                                                            
                                                            <div className='flex gap-4'>
                                                                <button onClick={() => handleGradeAssignment(student.student_id)} className='border-blue-200 border p-2 
                                                                rounded-lg hover:bg-blue-400 hover:border-blue-400 hover:text-white'>Return</button>
                                                                <a 
                                                                    href={`${SERVER}/${student.attachments}`} 
                                                                    download 
                                                                    className="rounded-lg border border-gray-200 bg-blue-400 text-white hover:bg-blue-500
                                                                    p-2"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                    </svg>

                                                                </a>
                                                            </div>
                                                        </div>
                                                        <iframe 
                                                            src={`${SERVER}/${student.attachments}`} 
                                                            width="100%" 
                                                            height="600" 
                                                            title="PDF Preview"
                                                        />
                                                        
                                                    
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='flex gap-6 justify-between mb-2'>
                                                            <div className='flex items-end gap-2'>
                                                                <span className='text-sm text-gray-500'>Grade:</span>
                                                                <input 
                                                                    type="number" 
                                                                    name={`grading-${student.student_id}`}
                                                                    value={grades[student.student_id] || ''}
                                                                    onChange={(e) => handleGradeChange(e, student.student_id)}
                                                                    className="border border-200 rounded-md"
                                                                />

                                                            </div>
                                                            
                                                            <div className='flex gap-4'>
                                                                <button onClick={() => handleGradeAssignment(student.student_id)} className='border-blue-200 border p-2 
                                                                rounded-lg hover:bg-blue-400 hover:border-blue-400 hover:text-white'>Return</button>
                                                                <a 
                                                                    href={`${SERVER}/${student.attachments}`} 
                                                                    download 
                                                                    className="rounded-lg border border-gray-200 bg-blue-400 text-white hover:bg-blue-500
                                                                    p-2"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                    </svg>

                                                                </a>
                                                            </div>
                                                        </div>
                                                        
                                                        <p>Preview not available for this file type.</p>
                                                        {/* Download button for unsupported file types */}
                                                        
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </>
            )}
          
            </div>
        </>
    )

}

