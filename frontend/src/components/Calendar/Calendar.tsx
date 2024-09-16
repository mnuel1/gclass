import React, { useState } from 'react';


type Event = {
	date: Date;
	description: string;
	time: string;
};

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
	const today = new Date();	
	const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
	const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [events, setEvents] = useState<Event[]>([
		{ date: new Date(currentYear, currentMonth, 5), description: 'CS Elective 2', time: '10:00' },
		{ date: new Date(currentYear, currentMonth, 8), description: 'Pre-Calculus', time: '14:00' },
		{ date: new Date(currentYear, currentMonth, 15), description: 'CS Electve 1', time: '09:30' },
		{ date: new Date(currentYear, currentMonth, 20), description: 'Computer Lab B', time: '18:00' },
		{ date: new Date(currentYear, currentMonth, 25), description: 'Computer Lab A', time: '07:00' },
		{ date: new Date(currentYear, currentMonth, 30), description: 'Differential Calculus', time: '11:00' },
	]);
	

	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
	const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i); // Example: [-10, +10] range from current year
	const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

	// Handle day click
	const handleDayClick = (date: Date) => {
		setSelectedDate(date);
	};


	// Get events for a specific day
	const getEventsForDay = (date: Date) => {
		return events.filter(event => event.date.toDateString() === date.toDateString());
	};

	return (
		<div className="container mx-auto p-4 h-full flex flex-col">
		
			<div className="flex flex-col md:flex-row justify-between items-center mb-4">

				<h2 className="text-2xl font-bold"> {months[currentMonth]} {currentYear} </h2>
				
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
					<button 
						type='button' 
						className='flex items-center hover:bg-blue-200 rounded-lg p-2 gap-2 w-fit lg:w-[62%] border border-gray-200'                        
					> 
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
							<path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
						</svg>
						<span className='hidden lg:block '>Schedule Meeting</span>
					</button>				
				</div>
			</div>

			
			<div className="overflow-x-auto grow">
				<div className="w-[1400px] lg:w-full h-full">
					
					<div className="grid grid-cols-7">
						{dayNames.map((dayName, idx) => (							
							<div key={idx} className="text-center font-semibold p-2 border">
								{dayName}
							</div>
						))}
					</div>

					{/* Days of the Month */}
					<div className="grid grid-cols-7 grow">
						{daysInMonth.map((day) => {
							const isToday = day.toDateString() === today.toDateString(); // Check if the day is today
							return (
								<div
									key={day.toDateString()}
									className={`h-40 p-2 text-left border cursor-pointer hover:bg-blue-100 overflow-y-auto ${
										selectedDate?.toDateString() === day.toDateString() ? 'bg-blue-200' : ''
									}`} 
									onClick={() => handleDayClick(day)}
								>
								{/* Display Day Number */}
								<div className={`text-gray-400 italic w-fit h-fit rounded-full p-2 flex justify-center items-center
									${isToday ? 'bg-blue-800 text-white' : ''}`}>{day.getDate()}</div>

								{/* Display Events for the Day */}
								<div className="mt-2 space-y-1">
									{getEventsForDay(day).map((event, idx) => (
									<div key={idx} className="flex justify-between text-sm bg-blue-300 p-1 rounded-lg">
										<span className='font-bold'>{event.description} </span>
										<span className='text-gray-500 font-semibold'>{event.time}  </span> 
									</div>
									))}
								</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		
		</div>
	);
};
