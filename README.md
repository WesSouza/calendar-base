# Calendar Base [![Build Status](https://travis-ci.org/WesleydeSouza/calendar-base.svg?branch=master)](https://travis-ci.org/WesleydeSouza/calendar-base)

Base methods for generating calendars using JavaScript.

Supports IE 6+, Chrome 1+, Firefox 3+, Safari 4+.


## Usage
```js
var Calendar = require( 'calendar-base' ).Calendar,
    cal = new Calendar();

cal.getCalendar( 2015, 0 );
// Returns an Array with the calendar for January 2015.
```

Usage with AMD and global variables are available through `dist/calendar-base.min.js`.

Check `examples` for some simple use cases.


### Date object notation

Every returned day or date argument follows this notation:
```js
{
    day: 1,
    month: 0,
    year: 1986,
    weekDay: 0,
    selected: false,
    siblingMonth: false
}
```

Properties `month` and `weekDay` respect JavaScript’s [`Date.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/prototype).

Only `day`, `month`, and `year` are necessary as input parameters for methods that require a date.


#### `Calendar( options )`

Constructor for a new calendar generator.

The object `options` may have the following properties:

* `startDate`: current selected starting date (default `undefined`)
* `endDate`: current selected ending date (default `undefined`)
* `siblingMonths`: whether to include the previous and next months’ days before and after the current month when generating a calendar (default `false`)
* `weekStart`: day of the week, respects [`Date.prototype.getDay`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay) (default `0`, Sunday)


#### `Calendar.interval( dateOne, dateTwo )`

Returns the amount of days between `dateOne` and `dateTwo` as a `Number`.

```js
> Calendar.interval( { year: 2010, month: 0, day: 1 }, { year: 2010, month: 0, day: 10 } );
11
```


#### `Calendar.daysInMonth( year, month )`

Returns the amount of days in the given month as a `Number`.

```js
> Calendar.daysInMonth( 2010, 0 );
31
```


#### `Calendar.isLeapYear( year )`

Returns whether the given year is a leap year, as a `Boolean`.

```js
> Calendar.isLeapYear( 2100 );
false
```


#### `Calendar.prototype.getCalendar( year, month )`

Returns an `Array` of dates with the days from the given month, always starting at the configured week day.

If sibling months is disabled, paddings are added as `false` to align the week days, otherwise the respective days from the previous or next months are included.

```js
> var cal = new Calendar( { siblingMonths: true } );
> cal.getCalendar( 2015, 5 );
[ { day: 31, weekDay: 0, month: 4, year: 2015, siblingMonth: true },
  { day: 1, weekDay: 1, month: 5, year: 2015 },
  { day: 2, weekDay: 2, month: 5, year: 2015 },
  ...
  { day: 4, weekDay: 6, month: 6, year: 2015, siblingMonth: true } ]
```


#### `Calendar.prototype.setDate( date )`

Alias to `Calendar.prototype.setStartDate`.


#### `Calendar.prototype.setStartDate( date )`

Sets the current selected starting date.

```js
> cal.setStartDate( { year: 2015, month: 0, day: 1 } );
```


#### `Calendar.prototype.setEndDate( date )`

Sets the current selected ending date.

```js
> cal.setEndDate( { year: 2015, month: 0, day: 31 } );
```


#### `Calendar.prototype.isDateSelected( date )`

Checks wheter the given date is inside the selected dates interval, returns a `Boolean`.

```js
> cal.isDateSelected( { year: 2015, month: 0, day: 10 } );
true
```


## License

MIT, http://wesleydesouza.mit-license.org/
