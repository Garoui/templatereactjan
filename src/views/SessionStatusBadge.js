import React from 'react';
import PropTypes from 'prop-types';

const SessionStatusBadge = ({ status }) => {
  // Normalize the status values to match expected cases
  const normalizedStatus = status ? status.toUpperCase() : 'UPCOMING';
  
  const statusConfig = {
    UPCOMING: { 
      text: 'À venir', 
      bgClass: 'bg-blue-100', 
      textClass: 'text-blue-800' 
    },
    SCHEDULED: {  // Add this to handle 'scheduled' status
      text: 'Planifié',
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-800'
    },
    ONGOING: { 
      text: 'En cours', 
      bgClass: 'bg-green-100', 
      textClass: 'text-green-800' 
    },
    COMPLETED: { 
      text: 'Terminé', 
      bgClass: 'bg-gray-100', 
      textClass: 'text-gray-800' 
    },
    CANCELLED: { 
      text: 'Annulé', 
      bgClass: 'bg-red-100', 
      textClass: 'text-red-800' 
    }
  };

  // Fallback to UPCOMING if status is not recognized
  const config = statusConfig[normalizedStatus] || statusConfig.UPCOMING;

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgClass} ${config.textClass}`}
      aria-label={`Statut: ${config.text}`}
    >
      {config.text}
    </span>
  );
};

SessionStatusBadge.propTypes = {
  status: PropTypes.oneOf([
    'UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED',
    'upcoming', 'ongoing', 'completed', 'cancelled', // Add lowercase variants
    'SCHEDULED', 'scheduled' // Add scheduled status
  ])
};

export default SessionStatusBadge;