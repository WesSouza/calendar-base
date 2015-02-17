# Calendar Base

Base methods for generating calendars using JavaScript.

Still WIP, only the most important functionality added: generate a calendar.

## Usage

	var Calendar = require( 'calendar-base' ).Calendar,
		cal = new Calendar( options );

	cal.getCalendar();
	// Returns an array with objects