// utils/sessionStatus.js
export const getSessionStatus = (start, end, isCancelled = false) => {
  if (isCancelled) return 'CANCELLED';
  
  const now = new Date();
  start = new Date(start);
  end = new Date(end);
  
  if (start <= now && end >= now) return 'ONGOING';
  if (end < now) return 'COMPLETED';
  return 'UPCOMING';
};
