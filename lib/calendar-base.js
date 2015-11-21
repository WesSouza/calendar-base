function Calendar (options) {
	options = options || {};

	this.startDate = options.startDate;
	this.endDate = options.endDate;
	this.maxInterval = options.maxInterval;
	this.maxConstraint = options.maxConstraint;
	this.siblingMonths = options.siblingMonths;
	this.weekNumbers = options.weekNumbers;
	this.weekStart = options.weekStart;

	if (this.weekStart === undefined) {
		this.weekStart = 0;
	}

	this.date = new Date(1986, 9, 14, 0, 0, 0);
}

Calendar.prototype.getCalendar = function (year, month) {
	this.date.setUTCFullYear(year);
	this.date.setUTCMonth(month);
	this.date.setUTCDate(1);

	var calendar = [],
		firstDay = this.date.getUTCDay(),
		firstDate = - (((7 - this.weekStart) + firstDay) % 7),
		lastDate = Calendar.daysInMonth(year, month),
		lastDay = ((lastDate - firstDate) % 7),
		lastDayLastMonth = Calendar.daysInMonth(year, month - 1),
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
					currentDate = lastDayLastMonth + currentDate;
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

Calendar.prototype.setStartDate = function (date) {
	this.startDate = date;
};

Calendar.prototype.setEndDate = function (date) {
	this.endDate = date;
};

Calendar.prototype.setDate = Calendar.prototype.setStartDate;

Calendar.interval = function (date1, date2) {
	var oDate1 = new Date(1986, 9, 14, 0, 0, 0), oDate2 = new Date(1986, 9, 14, 0, 0, 0);

	oDate1.setUTCFullYear(date1.year);
	oDate1.setUTCMonth(date1.month);
	oDate1.setUTCDate(date1.day);

	oDate2.setUTCFullYear(date2.year);
	oDate2.setUTCMonth(date2.month);
	oDate2.setUTCDate(date2.day);

	return Math.abs(Math.ceil((oDate2.getTime() - oDate1.getTime()) / 86400000)) + 1;
};

Calendar.daysInMonth = function (year, month) {
	return new Date(year, month + 1, 0).getDate();
};

Calendar.isLeapYear = function (year) {
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

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

module.exports = { Calendar: Calendar };
