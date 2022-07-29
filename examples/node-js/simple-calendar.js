const Calendar = require('calendar-base').Calendar;

const calendar = new Calendar({ siblingMonths: false, weekStart: 1 });
const today = new Date();

const table = [' Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', '\n'];

calendar
  .getCalendar(today.getUTCFullYear(), today.getUTCMonth())
  .forEach(function (date) {
    if (date) {
      table.push((date.day < 10 ? ' ' : '') + date.day);
      if (date.weekDay == 0) {
        table.push('\n');
      }
    } else {
      table.push('  ');
    }
  });

console.log('This month’s calendar\n', table.join('  '));
