import formatTime from './formatTime';

const formatHours = (hours) => {
  if (!hours || hours.length === 0) return 'N/A';

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return hours[0].open
    .map(
      ({ day, start, end }) =>
        `${dayNames[day]}: ${formatTime(start)} - ${formatTime(end)}`
    )
    .join('\n');
};

export default formatHours;
