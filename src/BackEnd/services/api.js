const API_URL = "http://localhost:3000/api";

export const fetchEvents = async (roomId) => {
  try {
    const response = await fetch(`${API_URL}/events?roomId=${roomId}`);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    console.log("Sending event data to create:", eventData); // Debug log
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error("Failed to create event");
    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    console.log("Sending event data to update:", { _id: eventId, ...eventData }); // Debug log
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: eventId,
        ...eventData,
      }),
    });
    if (!response.ok) throw new Error("Failed to update event");
    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete event");
    return await response.json();
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};