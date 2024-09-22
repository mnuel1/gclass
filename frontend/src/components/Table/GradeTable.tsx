
interface StudentData {
    id: string;
    name: string;
    student_code: string;
    email: string;
    grades: string[];
}

interface StudentsData {    
    studentsData: StudentData[],
    col: string[]
}



export const TableGrade:React.FC<{studentsData : StudentsData}> = ({studentsData}) => {
         
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
                    <thead>
                                                
                        <tr className="bg-gray-100">
                            <th className="hidden"></th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Student Code</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Student Email</th>
                            {studentsData.col.map((colName, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                                    {colName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    
                    <tbody>                        
                            {studentsData.studentsData.map((student) => (
                                <tr key={student.id}>
                                    <td className="hidden">{student.id}</td>                                
                                    <td className="px-4 py-2 border">{student.student_code}</td>
                                    <td className="px-4 py-2 border">{student.name}</td>
                                    <td className="px-4 py-2 border">{student.email}</td>

                                    {student.grades.map((grade, index)=> (
                                        <td key={index} className="px-4 py-2 border">
                                            {grade}
                                        </td>
                                    ))}
                                </tr>
                            ))}                                       
                    </tbody>
                </table>
            </div>
            

            

        </>
    )
}