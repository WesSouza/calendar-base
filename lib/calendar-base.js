function Calendar ( options ) {
	options = options || {};

	this.startDate = options.startDate;
	this.endDate = options.endDate;
	this.maxInterval = options.maxInterval;
	this.maxConstraint = options.maxConstraint;
	this.siblingMonths = options.siblingMonths;
	this.weekStart = options.weekStart;

	if ( this.weekStart === undefined ) {
		this.weekStart = 0;
	}

	this.date = new Date( 1986, 10, 14, 0, 0, 0 );
}

Calendar.prototype.getCalendar = function ( year, month ) {
	this.date.setFullYear( year );
	this.date.setMonth( month );
	this.date.setDate( 1 );

	var calendar = [],
		firstDay = this.date.getDay(),
		firstDate = - ( ( ( 7 - this.weekStart ) + firstDay ) % 7 ),
		lastDate = Calendar.daysInMonth( year, month ),
		lastDay = ( ( lastDate - firstDate ) % 7 ),
		lastDayLastMonth = Calendar.daysInMonth( year, month - 1 ),
		i = firstDate,
		max = ( lastDate - i ) + ( lastDay != 0 ? 7 - lastDay : 0 ) + firstDate,
		currentDay,
		currentDate,
		otherMonth,
		otherYear;

	while ( i < max ) {
		currentDate = i + 1;
		currentDay = ( ( i < 1 ? 7 + i : i ) + firstDay ) % 7;
		if ( currentDate < 1 || currentDate > lastDate ) {
			if ( this.siblingMonths ) {
				if ( currentDate < 1 ) {
					otherMonth = month - 1;
					otherYear = year;
					if ( otherMonth < 0 ) {
						otherMonth = 11;
						otherYear --;
					}
					currentDate = lastDayLastMonth + currentDate;
				}
				else if ( currentDate > lastDate ) {
					otherMonth = month + 1;
					otherYear = year;
					if ( otherMonth > 11 ) {
						otherMonth = 0;
						otherYear ++;
					}
					currentDate = i - lastDate + 1;
				}
				calendar.push( {
					day: currentDate,
					weekDay: currentDay,
					month: otherMonth,
					year: otherYear,
					siblingMonth: true
				} );
			}
			else {
				calendar.push( false );
			}
		}
		else {
			calendar.push( {
				day: currentDate,
				weekDay: currentDay,
				month: month,
				year: year
			} );
		}

		i ++;
	}

	return calendar;
};

Calendar.prototype.setStartDate = function ( date ) {
	this.startDate = date;
};

Calendar.prototype.setEndDate = function ( date ) {
	this.endDate = date;
};

Calendar.prototype.setDate = Calendar.prototype.setStartDate;

Calendar.interval = function ( date1, date2 ) {
	var date1 = new Date( date1.year, date1.month, date1.day, 0, 0, 0 ),
		date2 = new Date( date2.year, date2.month, date2.day, 0, 0, 0 );
	return Math.abs( Math.ceil( ( date2.getTime() - date1.getTime() ) / 86400000 ) ) + 1;
};

Calendar.daysInMonth = function ( year, month ) {
	// -1? It's December if considering January - 1!
	if ( month == -1 || month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11 ) {
		return 31;
	}
	else if ( month == 3 || month == 5 || month == 8 || month == 10 ) {
		return 30;
	}
	else if ( month == 1 ) {
		return 28 + Calendar.isLeapYear( year );
	}
};

Calendar.isLeapYear = function ( year ) {
	return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
}

module.exports = { Calendar: Calendar };