import React, { useState, useEffect } from 'react';
import { useMeetingQuery } from '../../pages/Student/process/Calendar/useCalendarQuery';
import { Event } from '../../process/Calendar/calendarType';
import useModalStore from '../../process/Modal/useModalStore';
import { FailedToast } from '../Toast/FailedToast';
import { Authentication } from '../../Auth/Authentication';



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

    const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, (_, __) => null);

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


    return (
		<>		
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
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
						className="size-6">
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
                                        className='grow'>
                                            <h4 className="font-bold">{event.title}</h4>
                                            <p className="text-gray-600">{event.time}</p>
                                        </div>
                                    <a className="text-blue-700 hover:underline" href={event.link}>{event.link}</a>
									</div>
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
