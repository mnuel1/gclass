import React, { useEffect, useState } from 'react';
import { api } from '../../process/axios';
import { SuccessToast } from '../../components/Toast/SuccessToast';
import { FailedToast } from '../../components/Toast/FailedToast';
import { Authentication } from '../../Auth/Authentication';
import useModalStore from '../../process/Modal/useModalStore';
interface Teacher {
  teacher_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  created_time: string;
}

export const AdminDashboard: React.FC = () => {
  const { getID } = Authentication();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 10;

  const {startLoading, stopLoading} = useModalStore()

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        startLoading();
  
        const response = await api.get(`/admin/teachers`);
        
        if (response.status !== 200) {
          FailedToast("Something went wrong");
          stopLoading();
          return;
        }
  
        const data: Teacher[] = response.data.data;
                
        setTeachers(data);
        stopLoading();
      } catch (error) {
        console.error('Error fetching teachers:', error);
        FailedToast("An error occurred while fetching teachers.");
        stopLoading();
      }
    };
  
    fetchTeachers();
  }, []);
  
  
  const sortedTeachers = [...teachers].sort((a, b) => {
    const statusOrder = { Pending: 1, Rejected: 2, Approved: 3 };
    const statusComparison = statusOrder[a.status] - statusOrder[b.status];

    if (statusComparison === 0) {
      return new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
    }

    return statusComparison;
  });


  const filteredTeachers = sortedTeachers
    .filter((teacher) => {
      const fullName = `${teacher.first_name} ${teacher.middle_name} ${teacher.last_name}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((teacher) =>
      filterStatus === 'all' ? true : teacher.status === filterStatus
    );

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateStatus = async (status: string, teacher_id: number, email_address: string) => {
    try {
        startLoading();
        const payload = {
            teacher_id,
            status,
            email_address
        }
                
        const response = await api.post(`/admin/change/status`, payload);
        
        if (response.status !== 200) {
          FailedToast("Something went wrong");
          stopLoading();
          return;
        }
        SuccessToast(`${email_address} status updated to ${status}`)
        stopLoading();
      } catch (error) {
        console.error('Error fetching teachers:', error);
        FailedToast("An error occurred while fetching teachers.");
        stopLoading();
      }
  }

  const handleApprove = (teacher_id: number, email_address: string) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.teacher_id === teacher_id ? { ...teacher, status: 'Approved' } : teacher
      )
    );
    updateStatus('Approved', teacher_id, email_address)
  };
  const handleReject = (teacher_id: number, email_address: string) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.teacher_id === teacher_id ? { ...teacher, status: 'Rejected' } : teacher
      )
    );
    updateStatus('Rejected', teacher_id, email_address)
  };

  return (
    <div className='flex flex-col'>
      <div className='bg-white'>
        <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
          <h1 className='text-2xl font-bold'>Teachers</h1>
        </div>
      </div>

      <div className='flex p-4'>
        <input
          type='text'
          placeholder='Search name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border-blue-200 border focus:outline-blue-400 rounded px-3 py-2 w-full'
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='border rounded px-3 py-2 ml-4'
        >
          <option value='all'>All</option>
          <option value='Approved'>Approved</option>
          <option value='Rejected'>Rejected</option>
          <option value='Pending'>Pending</option>
        </select>
      </div>

      {/* Teacher Table */}
      <div className='p-6 bg-white grow'>
        <table className='min-w-full table-auto border-collapse border'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Name</th>
              <th className='border px-4 py-2'>Email</th>
              <th className='border px-4 py-2'>Requested Date</th>
              <th className='border px-4 py-2'>Status</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.map((teacher) => (
              <tr key={teacher.teacher_id}>
                <td className='border px-4 py-2'>
                  {teacher.first_name} {teacher.middle_name} {teacher.last_name}
                </td>
                <td className='border px-4 py-2'>{teacher.email_address}</td>
                <td className='border px-4 py-2'>
                    {new Date(teacher.created_time).toLocaleDateString('en-US')}
                </td>

                <td className='border px-4 py-2'>{teacher.status}</td>
                <td className='border px-4 py-2'>
                  {teacher.status === 'Pending' && (
                    <div className='flex gap-4'>
                        <button
                        onClick={() => handleApprove(teacher.teacher_id, teacher.email_address)}
                        className='bg-green-500 text-white px-3 py-1 rounded'
                        >
                            Approve
                        </button>
                        <button
                        onClick={() => handleReject(teacher.teacher_id, teacher.email_address)}
                        className='bg-red-500 text-white px-3 py-1 rounded'
                        >
                            Reject
                        </button>
                    </div>
                  )}
                  {teacher.status === 'Rejected' && (
                    <div className='flex gap-4'>
                        <button
                        onClick={() => handleApprove(teacher.teacher_id, teacher.email_address)}
                        className='bg-green-500 text-white px-3 py-1 rounded'
                        >
                            Approve
                        </button>                       
                    </div>
                  )}
                  {teacher.status === 'Approved' && (
                    <div className='flex gap-4'>
                        <button
                        onClick={() => handleReject(teacher.teacher_id, teacher.email_address)}
                        className='bg-red-500 text-white px-3 py-1 rounded'
                        >
                            Reject
                        </button>                   
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center mt-4'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        >
          Previous
        </button>
        <span className='px-4 py-2'>{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
