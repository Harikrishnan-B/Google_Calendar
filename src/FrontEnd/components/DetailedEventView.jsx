import React from 'react';

const DetailedEventView = ({ events, viewMode, currentDate, isDarkMode, setShowModal, setSelectedDay, setEventToEdit }) => {
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = event.fullDate;
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const getWeekDates = () => {
    const date = new Date(currentDate);
    const day = date.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Set to Sunday of the week
    date.setDate(date.getDate() - day);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + i);
      weekDates.push(newDate);
    }
    
    return weekDates;
  };

  // For week view
  const renderWeekView = () => {
    const weekDates = getWeekDates();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return (
      <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} rounded-lg shadow-lg p-4`}>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day, index) => (
            <div key={index} className="text-center font-semibold">
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{day}</div>
              <div className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {weekDates[index].getDate()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, dateIndex) => {
            const dateEvents = getEventsForDate(date);
            return (
              <div key={dateIndex} className={`min-h-32 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border p-2 rounded-lg`}>
                {dateEvents.length > 0 ? (
                  dateEvents.map((event, eventIndex) => (
                    <div 
                      key={eventIndex}
                      onClick={() => {
                        setEventToEdit(event);
                        setSelectedDay(date.getDate());
                        setShowModal(true);
                      }}
                      className={`p-2 mb-1 rounded-lg cursor-pointer`}
                      style={{ backgroundColor: event.color || (isDarkMode ? '#4B5563' : '#E5E7EB') }}
                    >
                      <div className={`font-medium text-sm ${event.color ? 'text-white' : isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {event.title}
                      </div>
                      <div className={`text-xs ${event.color ? 'text-gray-100' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div 
                    className={`h-full flex items-center justify-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                    onClick={() => {
                      setSelectedDay(date.getDate());
                      setShowModal(true);
                    }}
                  >
                    + Add Event
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // For day view
  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} rounded-lg shadow-lg p-4`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {hours.map((hour) => {
            const hourEvents = dayEvents.filter(event => {
              if (!event.startTime) return false;
              const eventHour = parseInt(event.startTime.split(':')[0], 10);
              return eventHour === hour;
            });
            
            return (
              <div key={hour} className={`flex border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} py-2`}>
                <div className={`w-16 text-right pr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div className="flex-1">
                  {hourEvents.length > 0 ? (
                    hourEvents.map((event, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          setEventToEdit(event);
                          setSelectedDay(currentDate.getDate());
                          setShowModal(true);
                        }}
                        className="p-2 mb-1 rounded-lg cursor-pointer"
                        style={{ backgroundColor: event.color || (isDarkMode ? '#4B5563' : '#E5E7EB') }}
                      >
                        <div className={`font-medium ${event.color ? 'text-white' : isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {event.title}
                        </div>
                        <div className={`text-sm ${event.color ? 'text-gray-100' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                        {event.description && (
                          <div className={`text-xs mt-1 ${event.color ? 'text-gray-200' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {event.description}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div 
                      className={`h-6 w-full cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      onClick={() => {
                        setSelectedDay(currentDate.getDate());
                        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                        setEventToEdit({ startTime: timeStr, endTime: `${(hour + 1).toString().padStart(2, '0')}:00` });
                        setShowModal(true);
                      }}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {viewMode === 'week' ? renderWeekView() : renderDayView()}
    </div>
  );
};

export default DetailedEventView;