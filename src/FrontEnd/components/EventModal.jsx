import React, { useState, useEffect } from "react";

const EventModal = ({ selectedDay, handleEventCreate, handleCloseModal, eventToEdit }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventColor, setEventColor] = useState("#4CAF50");

  // Prefill form if editing an event
  useEffect(() => {
    if (eventToEdit) {
      setEventTitle(eventToEdit.title || "");
      setStartTime(eventToEdit.startTime || "");
      setEndTime(eventToEdit.endTime || "");
      setEventDescription(eventToEdit.description || "");
      setEventColor(eventToEdit.color || "#4CAF50");
    }
  }, [eventToEdit]);

  const handleSave = () => {
    if (!eventTitle.trim()) {
      return; // Prevent saving if title is empty
    }

    const eventData = {
      ...(eventToEdit && { id: eventToEdit.id }), // Include ID if editing
      title: eventTitle,
      date: eventToEdit ? eventToEdit.date : selectedDay, // Use existing date if editing
      startTime,
      endTime,
      description: eventDescription,
      color: eventColor,
    };
    handleEventCreate(eventData); // This will handle both create and update
    handleCloseModal(); // Close modal after saving
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
        <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white">
          <h2 className="text-xl font-bold">
            {eventToEdit ? `Edit Event` : `Create Event for Day ${selectedDay}`}
          </h2>
          <button
            className="absolute top-4 right-4 text-white hover:text-green-200 transition-colors"
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

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input
              type="text"
              placeholder="Add title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              placeholder="Add description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Color</label>
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setEventColor(color.value)}
                  className={`w-8 h-8 rounded-full focus:outline-none border-2 ${
                    eventColor === color.value ? "border-gray-800" : "border-transparent"
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
      </div>
    </div>
  );
};

export default EventModal;