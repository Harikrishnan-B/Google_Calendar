import React from 'react';

const CalendarGrid = ({ currentDate, setShowModal, setSelectedDay, events, isDarkMode, setEventToEdit }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const currentDay = new Date().getDate();
  const isCurrentMonth =
    new Date().getMonth() === currentDate.getMonth() &&
    new Date().getFullYear() === currentDate.getFullYear();

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setEventToEdit(null); 
    setShowModal(true);
  };

  const handleEditClick = (event) => {
    setSelectedDay(event.date); // Set the day of the event
    setEventToEdit(event); // Pass the event to edit
    setShowModal(true);
  };

  const getEventsForDay = (day) => {
    return events.filter((event) => event.date === day);
  };

  const emptyDays = Array(firstDay).fill(null);

  return (
    <div
      className={`mx-auto max-w-4xl shadow-2xl rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div
        className={`grid grid-cols-7 ${
          isDarkMode
            ? 'bg-gradient-to-r from-green-800 to-green-700 text-gray-200'
            : 'bg-gradient-to-r from-green-700 to-green-600 text-white'
        }`}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <span
            key={day}
            className={`p-3 text-center font-bold border-r ${
              isDarkMode ? 'border-green-600' : 'border-green-500'
            } last:border-r-0`}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {emptyDays.map((_, index) => (
          <div
            key={`empty-${index}`}
            className={`h-28 ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            } border-b border-r`}
          ></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
          const isToday = isCurrentMonth && day === currentDay;
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={day}
              className={`
                h-28 p-2 border-b border-r ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                } transition-all duration-200
                ${isToday ? (isDarkMode ? 'bg-green-900' : 'bg-green-50') : isDarkMode ? 'bg-gray-800' : 'bg-white'}
                ${isDarkMode ? 'hover:bg-green-900' : 'hover:bg-green-50'} relative group
              `}
              onClick={() => handleDayClick(day)}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`
                    ${
                      isToday
                        ? isDarkMode
                          ? 'bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center'
                          : 'bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                        : isDarkMode
                        ? 'text-gray-300'
                        : 'text-gray-700'
                    }
                    font-medium
                  `}
                >
                  {day}
                </span>
                <button
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-1 space-y-1 overflow-y-auto max-h-20 scrollbar-thin scrollbar-thumb-green-200">
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`${
                      isDarkMode
                        ? 'bg-gradient-to-r from-green-700 to-green-600 text-gray-100'
                        : 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                    } p-1 rounded-md text-xs shadow-sm flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-1 flex-shrink-0"></span>
                      <span className="truncate">{event.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {event.startTime && (
                        <span className={`${isDarkMode ? 'text-green-200' : 'text-green-100'}`}>
                          {event.startTime}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering day click
                          handleEditClick(event);
                        }}
                        className={`${
                          isDarkMode ? 'text-gray-200 hover:text-white' : 'text-white hover:text-gray-200'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {hasEvents > 0 && (
                <div className="absolute bottom-1 right-1">
                  <span
                    className={`${
                      isDarkMode ? 'bg-green-500 text-gray-100' : 'bg-green-600 text-white'
                    } text-xs rounded-full w-5 h-5 flex items-center justify-center`}
                  >
                    {dayEvents.length}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;