import React, { useState, useEffect } from "react";

const EventModal = ({
  selectedDay,
  handleEventCreate,
  handleCloseModal,
  eventToEdit,
  handleEventDelete, // Add this new prop
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventColor, setEventColor] = useState("#4CAF50");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation

  useEffect(() => {
    if (eventToEdit) {
      setEventTitle(eventToEdit.title || "");
      if (eventToEdit.startTime) {
        setStartTime(eventToEdit.startTime);
        console.log("Setting start time:", eventToEdit.startTime);
      }
      if (eventToEdit.endTime) {
        setEndTime(eventToEdit.endTime);
        console.log("Setting end time:", eventToEdit.endTime);
      }
      setEventDescription(eventToEdit.description || "");
      setEventColor(eventToEdit.color || "#4CAF50");
    }
  }, [eventToEdit]);

  const handleSave = () => {
    if (!eventTitle.trim()) {
      return;
    }

    const eventData = {
      ...(eventToEdit && { id: eventToEdit.id }),
      title: eventTitle,
      date: eventToEdit ? eventToEdit.date : selectedDay,
      startTime,
      endTime,
      description: eventDescription,
      color: eventColor,
    };
    handleEventCreate(eventData);
    handleCloseModal(); 
  };

  const handleDelete = () => {
    if (eventToEdit && eventToEdit.id) {
      handleEventDelete(eventToEdit.id);
      handleCloseModal();
    }
  };

  const colorOptions = [
    { name: "Green", value: "#4CAF50" },
    { name: "Blue", value: "#2196F3" },
    { name: "Purple", value: "#9C27B0" },
    { name: "Orange", value: "#FF9800" },
    { name: "Red", value: "#F44336" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {eventToEdit ? `Edit Event` : `Create Event for Day ${selectedDay}`}
          </h2>
          <div className="flex items-center">
            {/* Add Delete Button - only show when editing */}
            {eventToEdit && (
              <button
                className="text-white hover:text-red-200 transition-colors mr-3"
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Delete event"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
            <button
              className="text-white hover:text-green-200 transition-colors"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Add title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              placeholder="Add description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setEventColor(color.value)}
                  className={`w-8 h-8 rounded-full focus:outline-none border-2 ${
                    eventColor === color.value
                      ? "border-gray-800"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCloseModal}
              className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-600 transition-colors"
            >
              {eventToEdit ? "Update Event" : "Save Event"}
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center p-6 z-10">
            <div className="text-center mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-red-500 mx-auto mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Event?</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
            <div className="flex space-x-3 w-full">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;