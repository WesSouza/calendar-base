/**
 * Calendar constructor
 *
 * @param   {Object}  options               Calendar options
 *   @param {Object}  options.startDate     Date object indicating the selected start date
 *   @param {Object}  options.endDate       Date object indicating the selected end date
 *   @param {Boolean} options.siblingMonths Calculate dates from sibling months (before and after the current month, based on weekStart)
 *   @param {Boolean} options.weekNumbers   Caclulate the week days
 *   @param {Number}  options.weekStart     Day of the week to start the calendar, respects `Date.prototype.getDay` (defaults to `0`, Sunday)
 */
function Calendar (options) {
	options = options || {};

	this.startDate = options.startDate;
	this.endDate = options.endDate;
	this.siblingMonths = options.siblingMonths;
	this.weekNumbers = options.weekNumbers;
	this.weekStart = options.weekStart;

	if (this.weekStart === undefined) {
		this.weekStart = 0;
	}

	this.date = new Date(1986, 9, 14, 0, 0, 0);
}

/**
 * Calculate a calendar month
 *
 * @param  {Number} year  Year
 * @param  {Number} month Month [0-11]
 * @return {Array}        Calendar days
 */
Calendar.prototype.getCalendar = function (year, month) {
	this.date.setUTCFullYear(year);
	this.date.setUTCMonth(month);
	this.date.setUTCDate(1);

	year = this.date.getUTCFullYear();
	month = this.date.getUTCMonth();

	var calendar = [],
		firstDay = this.date.getUTCDay(),

		firstDate = - (((7 - this.weekStart) + firstDay) % 7),
		lastDate = Calendar.daysInMonth(year, month),
		lastDay = ((lastDate - firstDate) % 7),
		lastDatePreviousMonth = Calendar.daysInMonth(year, month - 1),
		i = firstDate,
		max = (lastDate - i) + (lastDay != 0 ? 7 - lastDay : 0) + firstDate,
		currentDay,
		currentDate,
		currentDateObject,
		currentWeekNumber = null,
		otherMonth,
		otherYear;

	while (i < max) {
		currentDate = i + 1;
		currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;
		if (currentDate < 1 || currentDate > lastDate) {
			if (this.siblingMonths) {
				if (currentDate < 1) {
					otherMonth = month - 1;
					otherYear = year;
					if (otherMonth < 0) {
						otherMonth = 11;
						otherYear --;
					}
					currentDate = lastDatePreviousMonth + currentDate;
				}
				else if (currentDate > lastDate) {
					otherMonth = month + 1;
					otherYear = year;
					if (otherMonth > 11) {
						otherMonth = 0;
						otherYear ++;
					}
					currentDate = i - lastDate + 1;
				}
				currentDateObject = {
					day: currentDate,
					weekDay: currentDay,
					month: otherMonth,
					year: otherYear,
					siblingMonth: true
				};
			}
			else {
				currentDateObject = false;
			}
		}
		else {
			currentDateObject = {
				day: currentDate,
				weekDay: currentDay,
				month: month,
				year: year
			};
		}

		if (currentDateObject && this.weekNumbers) {
			if (currentWeekNumber === null) {
				currentWeekNumber = Calendar.calculateWeekNumber(currentDateObject);
			}
			else if (currentDay == 1 && currentWeekNumber == 52) {
				currentWeekNumber = 1;
			}
			else if (currentDay == 1) {
				currentWeekNumber ++;
			}
			currentDateObject.weekNumber = currentWeekNumber;
		}

		if (currentDateObject && this.startDate) {
			currentDateObject.selected = this.isDateSelected(currentDateObject);
		}

		calendar.push(currentDateObject);
		i ++;
	}

	return calendar;
};

/**
 * Checks if a date is selected
 *
 * @param  {Object}  date Date object
 * @return {Boolean}      Selected status of the date
 */
Calendar.prototype.isDateSelected = function (date) {
	if (date.year == this.startDate.year && date.month == this.startDate.month && date.day == this.startDate.day) {
		return true;
	}
	else if (this.endDate) {
		if (date.year == this.startDate.year && date.month == this.startDate.month && date.day < this.startDate.day) {
			return false;
		}
		else if (date.year == this.endDate.year && date.month == this.endDate.month && date.day > this.endDate.day) {
			return false;
		}
		else if (date.year == this.startDate.year && date.month < this.startDate.month) {
			return false;
		}
		else if (date.year == this.endDate.year && date.month > this.endDate.month) {
			return false;
		}
		else if (date.year < this.startDate.year) {
			return false;
		}
		else if (date.year > this.endDate.year) {
			return false;
		}
		return true;
	}
	return false;
};

/**
 * Sets the selected period start
 *
 * @param {Object} date Date object
 */
Calendar.prototype.setStartDate = function (date) {
	this.startDate = date;
};

/**
 * Sets the selected period end
 *
 * @param {Object} date Date object
 */
Calendar.prototype.setEndDate = function (date) {
	this.endDate = date;
};

/**
 * Sets one selected date
 *
 * @param {Object} date Date object
 */
Calendar.prototype.setDate = Calendar.prototype.setStartDate;

/**
 * Calculates the difference between two dates (date1 - date2), in days
 *
 * @param  {Object} date1 Date object
 * @param  {Object} date2 Date object
 * @return {Number}       Days between the dates
 */
Calendar.diff = function (date1, date2) {
	var oDate1 = new Date(1986, 9, 14, 0, 0, 0), oDate2 = new Date(1986, 9, 14, 0, 0, 0);

	oDate1.setUTCFullYear(date1.year);
	oDate1.setUTCMonth(date1.month);
	oDate1.setUTCDate(date1.day);

	oDate2.setUTCFullYear(date2.year);
	oDate2.setUTCMonth(date2.month);
	oDate2.setUTCDate(date2.day);

	return Math.ceil((oDate1.getTime() - oDate2.getTime()) / 86400000);
};

/**
 * Calculates the interval between two dates
 *
 * @param  {Object} date1 Date object
 * @param  {Object} date2 Date object
 * @return {Number}       Number of days
 */
Calendar.interval = function (date1, date2) {
	return Math.abs(Calendar.diff(date1, date2)) + 1;
};

/**
 * Calculates the number of days in a month
 *
 * @param  {Number} year  Year
 * @param  {Number} month Month [0-11]
 * @return {Number}       Length of the month
 */
Calendar.daysInMonth = function (year, month) {
	return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculates if a given year is a leap year
 *
 * @param  {Number}  year Year
 * @return {Boolean}      Leap year or not
 */
Calendar.isLeapYear = function (year) {
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

/**
 * Calculates the week number for a given date
 *
 * @param  {Object} date Date object
 * @return {Number}      Week number
 */
// Adapted from http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
Calendar.calculateWeekNumber = function (date) {
	// Creates the requested date
	var current = new Date(1986, 9, 14, 0, 0, 0);
	current.setUTCFullYear(date.year);
	current.setUTCMonth(date.month);
	current.setUTCDate(date.day);

	// Create a copy of the object
	var target = new Date(current.valueOf());

	// ISO week date weeks start on monday so correct the day number
	var dayNr = (current.getUTCDay() + 6) % 7;

	// ISO 8601 states that week 1 is the week with the first thursday of that
	// year. Set the target date to the thursday in the target week.
	target.setUTCDate(target.getUTCDate() - dayNr + 3);

	// Store the millisecond value of the target date
	var firstThursday = target.valueOf();

	// Set the target to the first thursday of the year

	// First set the target to january first
	target.setUTCMonth(0, 1);

	// Not a thursday? Correct the date to the next thursday
	if (target.getUTCDay() != 4) {
		target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
	}

	// The weeknumber is the number of weeks between the  first thursday of the
	// year and the thursday in the target week.
	// 604800000 = 7 * 24 * 3600 * 1000
	return 1 + Math.ceil((firstThursday - target) / 604800000);
}

/**
 * Exports the Calendar
 */
module.exports = { Calendar: Calendar };
