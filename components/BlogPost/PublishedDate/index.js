import { DateDisplay } from "./index.style";

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

function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function formatPublishedDateForDateTime(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1,
  )}-${date.getDate()}`;
}

function formatPublishedDateForDisplay(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(
    date.getMonth(),
  )} ${date.getFullYear()}`;
}

export default function PublishedDate(props) {
  const { date } = props;

  return (
    <DateDisplay datetime={formatPublishedDateForDateTime(date)}>
      {formatPublishedDateForDisplay(date)}
    </DateDisplay>
  );
}
