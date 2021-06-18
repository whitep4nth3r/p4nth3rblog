function getMonthStringFromInt(int) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[int];
}

function getDayStringFromInt(int) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[int];
}

function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

export function formatDateForDateTime(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1,
  )}-${date.getDate()}`;
}

export function formatDateForDisplay(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(
    date.getMonth(),
  )} ${date.getFullYear()}`;
}

export function formatDateForTwitchDisplay(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${getDayStringFromInt(
    date.getDay(),
  )} ${date.getDate()} ${getMonthStringFromInt(
    date.getMonth(),
  )} ${date.getFullYear()}`;
}

export function formatTwitchScheduleTimeSlot(startTimeString, endTimeString) {
  const startTimeStamp = Date.parse(startTimeString);
  const startDate = new Date(startTimeStamp);

  const endTimeStamp = Date.parse(endTimeString);
  const endDate = new Date(endTimeStamp);

  return `${startDate.getHours()}:${addLeadingZero(
    startDate.getMinutes(),
  )} - ${endDate.getHours()}:${addLeadingZero(endDate.getMinutes())}`;
}
