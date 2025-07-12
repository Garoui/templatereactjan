import React, { useState } from "react";

const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statusOptions = ["Pending", "Paid", "Unpaid", "Canceled"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Unpaid":
        return "bg-red-100 text-red-800";
      case "Canceled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`inline-flex justify-between w-full px-4 py-2 text-sm font-medium rounded-md ${getStatusColor(
          currentStatus
        )} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentStatus}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {statusOptions.map((status) => (
              <button
                key={status}
                className={`block w-full text-left px-4 py-2 text-sm ${getStatusColor(
                  status
                )} hover:bg-gray-50`}
                onClick={() => {
                  onStatusChange(status);
                  setIsOpen(false);
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;