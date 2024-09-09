const formatTime = (time) => {
  const hour = parseInt(time.slice(0, 2), 10);
  const minute = time.slice(2);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute} ${period}`;
};

export default formatTime;
