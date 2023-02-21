import { Calendar } from 'https://cdn.skypack.dev/pin/calendar-base@v2.0.0-byfncDR1bnSqYGwdryci/mode=imports,min/optimized/calendar-base.js';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const calendar = new Calendar({
  siblingMonths: true,
  weekStart: true,
});
const today = new Date();
const $calendarMonth = document.querySelector('.js-calendar-month'),
  $calendar = document.querySelector('.js-calendar');

$calendarMonth.innerHTML = months[today.getUTCMonth()];

calendar
  .getCalendar(today.getUTCFullYear(), today.getUTCMonth())
  .forEach(function (date) {
    const div = document.createElement('li');
    if (date) {
      div.className =
        'calendar-day' + (date.siblingMonth ? ' -sibling-month' : '');
      div.innerHTML = date.day;
    }
    $calendar.appendChild(div);
  });
