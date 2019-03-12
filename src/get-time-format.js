// Transform time format from 4:5 to 04:05
const getTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, `0`);
  const minutes = date.getMinutes().toString().padStart(2, `0`);
  return `${hours}:${minutes}`;
};

// Transform number of minutes to "1h 30m" format
const getTimeFromMinutes = (minutesCount) => {
  const hours = Math.floor(minutesCount / 60);
  const minutes = minutesCount % 60;
  if (hours) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export {getTimeFromTimestamp, getTimeFromMinutes};
