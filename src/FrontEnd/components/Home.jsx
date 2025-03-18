import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosSunny } from 'react-icons/io';
import CalendarGrid from "../components/CalendarGrid";
import EventModal from "../components/EventModal";
import { fetchEvents, createEvent } from "../../BackEnd/services/api.js";

const Home = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState("month");
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null); // New state for editing

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await fetchEvents();
        const formattedEvents = eventsData.map((event) => ({
          id: event._id,
          title: event.title,
          date: new Date(event.date).getDate(),
          startTime: event.startTime,
          endTime: event.endTime,
          description: event.description,
          color: event.color,
          fullDate: new Date(event.date),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [currentDate]);

  const handleEventCreate = async (eventData) => {
    try {
      const fullDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        eventData.date
      );

      const eventPayload = {
        ...eventData,
        date: fullDate,
      };

      let updatedEvents;
      if (eventData.id) {
        // Update existing event (client-side only for now)
        updatedEvents = events.map((event) =>
          event.id === eventData.id
            ? { ...event, ...eventData, fullDate }
            : event
        );
      } else {
        // Create new event
        const createdEvent = await createEvent(eventPayload);
        updatedEvents = [
          ...events,
          {
            id: createdEvent._id,
            title: createdEvent.title,
            date: new Date(createdEvent.date).getDate(),
            startTime: createdEvent.startTime,
            endTime: createdEvent.endTime,
            description: createdEvent.description,
            color: createdEvent.color,
            fullDate: new Date(createdEvent.date),
          },
        ];
      }

      setEvents(updatedEvents);
      setShowModal(false);
      setEventToEdit(null); // Clear edit state
    } catch (error) {
      console.error("Failed to create/update event:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEventToEdit(null); // Clear edit state on close
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-md'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Calendar App
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <button
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={handlePrevMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mx-4`}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={handleNextMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className={`p-1 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex`}>
              <button
                className={`px-4 py-2 ${
                  viewMode === "month"
                    ? isDarkMode
                      ? "bg-green-500 text-white"
                      : "bg-green-600 text-white"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                } rounded-md`}
                onClick={() => setViewMode("month")}
              >
                Month
              </button>
              <button
                className={`px-4 py-2 ${
                  viewMode === "week"
                    ? isDarkMode
                      ? "bg-green-500 text-white"
                      : "bg-green-600 text-white"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                } rounded-md`}
                onClick={() => setViewMode("week")}
              >
                Week
              </button>
              <button
                className={`px-4 py-2 ${
                  viewMode === "day"
                    ? isDarkMode
                      ? "bg-green-500 text-white"
                      : "bg-green-600 text-white"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                } rounded-md`}
                onClick={() => setViewMode("day")}
              >
                Day
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-600'} hover:bg-opacity-80`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <IoIosSunny size={20} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleLogout}
              className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className={`rounded-t-xl shadow-lg p-4 mb-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Calendar
              </h1>
              <span className={`${
                isDarkMode ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800'
              } text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
                {events.length} Events
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Loading events...
            </p>
          </div>
        ) : (
          <CalendarGrid
            currentDate={currentDate}
            setShowModal={setShowModal}
            setSelectedDay={setSelectedDay}
            events={events.filter((event) => {
              const eventMonth = event.fullDate.getMonth();
              const eventYear = event.fullDate.getFullYear();
              return (
                eventMonth === currentDate.getMonth() &&
                eventYear === currentDate.getFullYear()
              );
            })}
            viewMode={viewMode}
            isDarkMode={isDarkMode}
            setEventToEdit={setEventToEdit} // Pass setEventToEdit
          />
        )}

        {showModal && (
          <EventModal
            selectedDay={selectedDay}
            handleEventCreate={handleEventCreate}
            handleCloseModal={handleCloseModal}
            eventToEdit={eventToEdit} // Pass eventToEdit
          />
        )}
      </div>
    </div>
  );
};

export default Home;