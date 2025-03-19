import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { roomAtom } from "../atoms/authAtoms";

const RoomSelection = () => {
  const navigate = useNavigate();
  const [, setRoom] = useAtom(roomAtom);

  const rooms = [
    { id: 1, name: "Room A", icon: "🏠" },
    { id: 2, name: "Room B", icon: "🏡" },
    { id: 3, name: "Room C", icon: "🏘️" },
  ];

  const handleRoomSelect = (roomId) => {
    setRoom(roomId);
    console.log(`Selected Room ID: ${roomId}`);
    navigate("/home", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Select a Room
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Choose a room to view its calendar
        </p>
        <div className="grid grid-cols-1 gap-4">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => handleRoomSelect(room.id)}
              className="flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-lg px-4 py-3 text-gray-700 text-lg font-medium 
              hover:bg-gray-50 hover:border-gray-400 hover:shadow-xl hover:scale-[1.02] 
              active:bg-gray-100 active:scale-[1.01]
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transition-all duration-300 ease-in-out"
            >
              <span className="text-2xl">{room.icon}</span>
              <span>{room.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;