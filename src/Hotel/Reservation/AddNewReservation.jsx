import React, { useState } from "react";
import "./Reservation.css";
import { BedDouble, CheckCircle } from "lucide-react";

const ROOM_TYPES = [
  { label: "Standard Room", count: 2 },
  { label: "Deluxe Room", count: 1 },
  { label: "Suite Room", count: 0 },
  { label: "Family Room", count: 1 },
  { label: "Executive Room", count: 0 },
];

const ROOMS = {
  "Standard Room": [
    { roomNo: 202, adult: 2, child: 3, available: true },
    { roomNo: 203, adult: 1, child: 1, available: true },
  ],
  "Deluxe Room": [{ roomNo: 301, adult: 2, child: 0, available: true }],
  "Family Room": [{ roomNo: 401, adult: 4, child: 2, available: true }],
};

const AddNewReservation = () => {
  const [activeType, setActiveType] = useState("Standard Room");
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="reservation-wrapper">
      {/* ================= ROOM TYPE TABS ================= */}
      <div className="room-type-tabs">
        {ROOM_TYPES.map((type) => (
          <button
            key={type.label}
            disabled={type.count === 0}
            className={`room-tab 
              ${activeType === type.label ? "active" : ""}
              ${type.count === 0 ? "disabled" : ""}
            `}
            onClick={() => {
              setActiveType(type.label);
              setSelectedRoom(null);
            }}
          >
            {type.label}
            <span className="count">{type.count}</span>
          </button>
        ))}
      </div>

      {/* ================= ROOMS GRID ================= */}
      <div className="room-card-grid">
        {(ROOMS[activeType] || []).length === 0 && (
          <div className="no-rooms">
            No rooms available for this category
          </div>
        )}

        {(ROOMS[activeType] || []).map((room) => {
          const isSelected = selectedRoom === room.roomNo;

          return (
            <div
              key={room.roomNo}
              className={`room-card ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedRoom(room.roomNo)}
            >
              <div className="room-card-top">
                <div>
                  <h4>Room No: {room.roomNo}</h4>
                  <span className="availability">Available</span>
                </div>

                {isSelected ? (
                  <CheckCircle size={18} className="selected-icon" />
                ) : (
                  <BedDouble size={18} />
                )}
              </div>

              <div className="room-card-info">
                <span>Adult : {room.adult}</span>
                <span>Child : {room.child}</span>
              </div>

              <div className="reservation-status">
                Reservation Status : <b>No</b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddNewReservation;
