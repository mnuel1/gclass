import React, { useState, useEffect } from 'react';
import { useDeleteMeeting, useEditMeeting, useMeetingQuery } from '../../process/Calendar/useCalendarQuery';
import { Event } from '../../process/Calendar/calendarType';
import useModalStore from '../../process/Modal/useModalStore';
import { FailedToast } from '../Toast/FailedToast';
import { Authentication } from '../../Auth/Authentication';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { EditSched } from '../Modal/EditSchedModal';

const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days: Date[] = [];

    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return days;
};

export const CalendarView: React.FC = () => {
    const { getID } = Authentication();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
	const [show, setShow] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [edit, setEdit] = useState(false);
	const [id, setID] = useState("");
	const [classid, setClassid] = useState("");
    const { data, isSuccess, isError, isLoading } = useMeetingQuery(getID());
    const { startLoading, stopLoading } = useModalStore();

    useEffect(() => {
        if (isLoading) {
            startLoading();
        } else {
            stopLoading();
        }

        if (isSuccess && data) {
            setEvents(data);					
        }

        if (isError) {
            FailedToast("Something went wrong!");
        }
    }, [data, isSuccess, isError, events]);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);

    const calendarDays = [...leadingEmptyDays, ...daysInMonth];

    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
    const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i);
    const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    
    const handleDayClick = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
		setShow(true);
    };

    const closeSidePanel = () => {
        setShow(false);
    };

    // Get events for a specific day
    const getEventsForDay = (date: Date) => {
        return events.filter(event => new Date(event.start_date).toDateString() === date.toDateString());
    };

	const deleteScheduleMutation = useDeleteMeeting()
	const handleDeleteSchedule = () => {
		deleteScheduleMutation.mutate(id)
		setConfirmDelete(false)
	}
	const createTimestamp = (date : any, time: any) => {
        
        const formattedDate = date.replace(/\//g, '-'); 
        const dateTimeString = `${formattedDate}T${time}`; 
        const rawdate = new Date(dateTimeString); 
            
        const year = rawdate.getFullYear();
        const month = String(rawdate.getMonth() + 1).padStart(2, '0');
        const day = String(rawdate.getDate()).padStart(2, '0');
        const hours = String(rawdate.getHours()).padStart(2, '0');
        const minutes = String(rawdate.getMinutes()).padStart(2, '0');
        const seconds = String(rawdate.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
	const editScheduleMutation = useEditMeeting()
	const handleEditSchedule = (data : any) => {
		const timestamp = createTimestamp(data.date, data.time)
		const schedule = {
			start_date : timestamp,
			class_meeting_id : id,
			class_id: classid
		}
		editScheduleMutation.mutate(schedule)
		
		

	}

    return (
		<>
		{edit && <EditSched class_id="" onClose={() => setEdit(false)} onSubmit={handleEditSchedule}/>}
		{confirmDelete && <ConfirmModal id="" onClose={() => setConfirmDelete(false)} onConfirm={handleDeleteSchedule}/>}
		<div className='flex h-full w-full'>
			{/* Side Panel: Responsive */}
			<div
				className={`flex-col gap-4 border-r border-gray-200 h-full z-10 
					bg-white transition-transform duration-300 ease-in-out fixed md:static 
					${show ? 'translate-x-0 w-full md:w-[30%]' : '-translate-x-full md:translate-x-0'} 
					shadow-lg md:shadow-none`}
			>
				{/* Close button for mobile */}
				<div className="p-4 flex justify-between items-center md:hidden">
					<h3 className="text-xl font-semibold">Events</h3>
					<button
						className="text-gray-500 focus:outline-none 
						rounded-full hover:bg-gray-200 p-2"
						onClick={closeSidePanel}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>

					</button>
				</div>

				{/* Show the events for the selected day */}
				{selectedDate && (
					<div className="p-4">						
						{getEventsForDay(selectedDate).length > 0 ? (
							getEventsForDay(selectedDate).map((event, idx) => (
								<div 
								key={idx} 								
								className="flex justify-between 
								items-center bg-blue-100 p-2 rounded-md my-2 cursor-pointer">
                                    <div className=''>                                    
                                        <div 
                                        onClick={() => {setEdit(true); setID(event.class_meeting_id); setClassid(event.class_id)}}
                                        className='grow'>
                                            <h4 className="font-bold">{event.title}</h4>
                                            <p className="text-gray-600">{event.time}</p>
                                        </div>
                                    <a className="text-blue-700 hover:underline" href={event.link}> {event.link}</a>
									</div>
									<button 
										onClick={() => {setConfirmDelete(true); setID(event.class_meeting_id)}}
										className='hover:bg-red-200 p-2 rounded-full'>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
										className="size-6 text-red-600">
											<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
										</svg>
									</button>
									

								</div>
							))
						) : (
							<p className="text-gray-500 mt-2">No events for this day</p>
						)}
					</div>
				)}
			</div>

			<div className="p-4 h-full flex flex-col grow overflow-hidden">
				<div className="flex flex-col md:flex-row justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">{months[currentMonth]} {currentYear}</h2>

					<div className="flex items-center space-x-2 w-full md:w-1/2">
						<select
							value={currentMonth}
							onChange={(e) => setCurrentMonth(Number(e.target.value))}
							className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm p-2"
						>
							{months.map((month, index) => (
								<option key={index} value={index}>
									{month}
								</option>
							))}
						</select>

						<select
							value={currentYear}
							onChange={(e) => setCurrentYear(Number(e.target.value))}
							className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm p-2"
						>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="overflow-x-auto grow ">
					<div className="w-[1400px] grow lg:w-full h-full">
						<div className="grid grid-cols-7">
							{dayNames.map((dayName, idx) => (
								<div key={idx} className="text-center font-semibold p-2 border">
									{dayName}
								</div>
							))}
						</div>

						{/* Days of the Month */}
						<div className="grid grid-cols-7 grow">
							{calendarDays.map((day, idx) => {
								const isToday = day && day.toDateString() === today.toDateString();
								return (
									<div
										key={idx}
										className={`h-40 p-2 text-left border cursor-pointer hover:bg-blue-100 overflow-y-auto ${
											selectedDate?.toDateString() === day?.toDateString() ? 'bg-gray-100' : ''
										}`}
										onClick={() => handleDayClick(day)}
									>
										{day ? (
											<>                                            
												<div
													className={`text-gray-400 italic w-fit h-fit rounded-full p-2 flex justify-center items-center ${
														isToday ? 'bg-blue-800 text-white' : ''
													}`}
												>
													{day.getDate()}
												</div>
											
												<div className="mt-2 space-y-1">
													{getEventsForDay(day).map((event, idx) => (
														<div key={idx} className="flex justify-between text-sm bg-blue-300 p-1 rounded-lg">
															<span className="font-bold">{event.title}</span>
															<span className="text-gray-500 font-semibold">{event.time}</span>
														</div>
													))}
												</div>
											</>
										) : (
											<div className="h-full"></div> // Empty cells for padding
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
    );
};