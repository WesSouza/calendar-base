# Calendar Base

Base methods for generating calendars using JavaScript.


## Usage

	var Calendar = require( 'calendar-base' ).Calendar,
		cal = new Calendar();

	cal.getCalendar( 2015, 0 );
	// Returns an Array with the calendar for January 2015.


### Date object notation

Every returned day or date argument follows this notation:

	{
		day: 1,
		month: 0,
		year: 1986,
		weekDay: 0,
		selected: false,
		siblingMonth: false
	}

Properties `month` and `weekDay` respect JavaScript’s [`Date.prorotype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/prototype).

Only `day`, `month`, and `year` are necessary as input parameters for methods that require a date.


#### `Calendar( options )`

Constructor for a new calendar generator.

The object `options` may have the following properties:

* `startDate`: current selected starting date (default `undefined`)
* `endDate`: current selected ending date (default `undefined`)
* `siblingMonths`: whether to include the previous and next months’ days before and after the current month when generating a calendar (default `false`)
* `weekStart`: day of the week, respects [`Date.prorotype.getDay`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay) (default `0`, Sunday)


#### `Calendar.interval( dateOne, dateTwo )`

Returns the amount of days between `dateOne` and `dateTwo` as a `Number`.

	> Calendar.interval( { year: 2010, month: 0, day: 1 }, { year: 2010, month: 0, day: 10 } );
	< 11


#### `Calendar.daysInMonth( year, month )`

Returns the amount of days in the given month as a `Number`.


#### `Calendar.isLeapYear( year )`

Returns whether the given year is a leap year, as a `Boolean`.


### `Calendar.prorotype.setDate( date )`

Alias to `Calendar.prototype.setStartDate`.


### `Calendar.prorotype.setStartDate( date )`

Sets the current selected starting date.


### `Calendar.prorotype.isDateSelected( date )`

Checks wheter the given date is inside the selected dates interval, returns a `Boolean`.


### `Calendar.prorotype.getCalendar( year, month )`

Returns an `Array` of dates with the days from the given month, always starting at the configured week day.

If sibling months is disabled, paddings are added as `false` to align the week days, otherwise the respective days from the previous or next months are included.


### `Calendar.prorotype.setEndDate( date )`

Sets the current selected ending date.


## License

MIT, http://wesleydesouza.mit-license.org/
