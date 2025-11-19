import React, { useState } from "react";
import profilenoti from "../../../../assets/images/crew/profilenoti.png";
import { HiOutlineUsers } from "react-icons/hi";
import { FiMoreVertical, FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";

interface Event {
  id: string | number;
  guestEmails?: string[];
  guests?: any[];
  [key: string]: any; // For other event props
}

interface EventCardProps {
  title: string;
  start: string | Date;
  location: string;
  description?: string;
  event: Event;
  onUpdate: (event: Event) => void;
  onDelete: (event: Event) => void;
  onAddGuest: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  start,
  location,
  description,
  event,
  onUpdate,
  onDelete,
  onAddGuest,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const formatEventTime = (startDate: string | Date) => {
    const date = new Date(startDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const formatLocation = (loc: string) => {
    const locationMap: Record<string, string> = {
      zoom: "Virtual - Zoom Meeting",
      "google-meet": "Virtual - Google Meet",
      "ms-teams": "Virtual - Microsoft Teams",
      "in-person": "In Person Meeting",
    };
    return locationMap[loc] || loc;
  };

  const getGuestCount = (evt: Event) => {
    const emailCount = evt.guestEmails?.length || 0;
    const guestCount = evt.guests?.length || 0;
    return emailCount + guestCount;
  };

  return (
    <div
      className={`
        flex items-start p-3 rounded-lg transition-all duration-300
        ${isHovered ? "shadow-lg bg-gray-100 -translate-y-1" : "shadow-sm bg-white"}
        cursor-pointer
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Image */}
      <div className="mr-3 flex-shrink-0">
        <img
          src={profilenoti}
          alt="profile"
          className={`w-10 h-10 rounded-full transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
      </div>

      {/* Event Info */}
      <div className="flex flex-1 justify-between">
        <div className="flex-1">
          <h3
            className={`text-base font-medium mb-1 transition-colors duration-300 ${
              isHovered ? "text-blue-600" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p className="text-gray-500 mb-1">{formatEventTime(start)}</p>
          <p className="text-gray-500">{formatLocation(location)}</p>
          {description && <p className="text-gray-500 mt-1">{description}</p>}

          {/* Guest Count */}
          {getGuestCount(event) > 0 && (
            <div className="flex items-center mt-1 text-blue-600 text-xs opacity-80 transition-opacity duration-300">
              <HiOutlineUsers className="mr-1" />
              <span>
                {getGuestCount(event)} {getGuestCount(event) === 1 ? "guest" : "guests"}
              </span>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="relative">
          <FiMoreVertical
            className={`text-gray-500 cursor-pointer transition-transform duration-300 ${
              isHovered ? "scale-125" : "scale-100"
            }`}
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          />

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={() => {
                  onUpdate(event);
                  setMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FiEdit className="mr-2" /> Update Event
              </button>
              <button
                onClick={() => {
                  onDelete(event);
                  setMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FiTrash2 className="mr-2" /> Delete Event
              </button>
              <button
                onClick={() => {
                  onAddGuest(event);
                  setMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FiUserPlus className="mr-2" /> Add Guest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;