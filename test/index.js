var assert = require('assert'),
	Calendar = require('..').Calendar;

describe('calendar-base', function () {

	it('should return a valid calendar', function (done) {
		var calendar = new Calendar(),
			calendarDays = calendar.getCalendar(1986, 9);
		assert.deepEqual(calendarDays, [ false, false, false, { day: 1, weekDay: 3, month: 9, year: 1986 }, { day: 2, weekDay: 4, month: 9, year: 1986 }, { day: 3, weekDay: 5, month: 9, year: 1986 }, { day: 4, weekDay: 6, month: 9, year: 1986 }, { day: 5, weekDay: 0, month: 9, year: 1986 }, { day: 6, weekDay: 1, month: 9, year: 1986 }, { day: 7, weekDay: 2, month: 9, year: 1986 }, { day: 8, weekDay: 3, month: 9, year: 1986 }, { day: 9, weekDay: 4, month: 9, year: 1986 }, { day: 10, weekDay: 5, month: 9, year: 1986 }, { day: 11, weekDay: 6, month: 9, year: 1986 }, { day: 12, weekDay: 0, month: 9, year: 1986 }, { day: 13, weekDay: 1, month: 9, year: 1986 }, { day: 14, weekDay: 2, month: 9, year: 1986 }, { day: 15, weekDay: 3, month: 9, year: 1986 }, { day: 16, weekDay: 4, month: 9, year: 1986 }, { day: 17, weekDay: 5, month: 9, year: 1986 }, { day: 18, weekDay: 6, month: 9, year: 1986 }, { day: 19, weekDay: 0, month: 9, year: 1986 }, { day: 20, weekDay: 1, month: 9, year: 1986 }, { day: 21, weekDay: 2, month: 9, year: 1986 }, { day: 22, weekDay: 3, month: 9, year: 1986 }, { day: 23, weekDay: 4, month: 9, year: 1986 }, { day: 24, weekDay: 5, month: 9, year: 1986 }, { day: 25, weekDay: 6, month: 9, year: 1986 }, { day: 26, weekDay: 0, month: 9, year: 1986 }, { day: 27, weekDay: 1, month: 9, year: 1986 }, { day: 28, weekDay: 2, month: 9, year: 1986 }, { day: 29, weekDay: 3, month: 9, year: 1986 }, { day: 30, weekDay: 4, month: 9, year: 1986 }, { day: 31, weekDay: 5, month: 9, year: 1986 }, false ]);
		done();
	});

	it('should return a valid calendar with sibling months', function (done) {
		var calendar = new Calendar({ siblingMonths: true }),
			calendarDays = calendar.getCalendar(1986, 9);
		assert.deepEqual(calendarDays, [ { day: 28, weekDay: 0, month: 8, year: 1986, siblingMonth: true }, { day: 29, weekDay: 1, month: 8, year: 1986, siblingMonth: true }, { day: 30, weekDay: 2, month: 8, year: 1986, siblingMonth: true }, { day: 1, weekDay: 3, month: 9, year: 1986 }, { day: 2, weekDay: 4, month: 9, year: 1986 }, { day: 3, weekDay: 5, month: 9, year: 1986 }, { day: 4, weekDay: 6, month: 9, year: 1986 }, { day: 5, weekDay: 0, month: 9, year: 1986 }, { day: 6, weekDay: 1, month: 9, year: 1986 }, { day: 7, weekDay: 2, month: 9, year: 1986 }, { day: 8, weekDay: 3, month: 9, year: 1986 }, { day: 9, weekDay: 4, month: 9, year: 1986 }, { day: 10, weekDay: 5, month: 9, year: 1986 }, { day: 11, weekDay: 6, month: 9, year: 1986 }, { day: 12, weekDay: 0, month: 9, year: 1986 }, { day: 13, weekDay: 1, month: 9, year: 1986 }, { day: 14, weekDay: 2, month: 9, year: 1986 }, { day: 15, weekDay: 3, month: 9, year: 1986 }, { day: 16, weekDay: 4, month: 9, year: 1986 }, { day: 17, weekDay: 5, month: 9, year: 1986 }, { day: 18, weekDay: 6, month: 9, year: 1986 }, { day: 19, weekDay: 0, month: 9, year: 1986 }, { day: 20, weekDay: 1, month: 9, year: 1986 }, { day: 21, weekDay: 2, month: 9, year: 1986 }, { day: 22, weekDay: 3, month: 9, year: 1986 }, { day: 23, weekDay: 4, month: 9, year: 1986 }, { day: 24, weekDay: 5, month: 9, year: 1986 }, { day: 25, weekDay: 6, month: 9, year: 1986 }, { day: 26, weekDay: 0, month: 9, year: 1986 }, { day: 27, weekDay: 1, month: 9, year: 1986 }, { day: 28, weekDay: 2, month: 9, year: 1986 }, { day: 29, weekDay: 3, month: 9, year: 1986 }, { day: 30, weekDay: 4, month: 9, year: 1986 }, { day: 31, weekDay: 5, month: 9, year: 1986 }, { day: 1, weekDay: 6, month: 10, year: 1986, siblingMonth: true } ]);
		done();
	});

	it('should return a valid calendar with sibling months and week starting on a different day', function (done) {
		var calendar = new Calendar({ siblingMonths: true, weekStart: 1 }),
			calendarDays = calendar.getCalendar(1986, 9);
		assert.deepEqual(calendarDays, [ { day: 29, weekDay: 1, month: 8, year: 1986, siblingMonth: true }, { day: 30, weekDay: 2, month: 8, year: 1986, siblingMonth: true }, { day: 1, weekDay: 3, month: 9, year: 1986 }, { day: 2, weekDay: 4, month: 9, year: 1986 }, { day: 3, weekDay: 5, month: 9, year: 1986 }, { day: 4, weekDay: 6, month: 9, year: 1986 }, { day: 5, weekDay: 0, month: 9, year: 1986 }, { day: 6, weekDay: 1, month: 9, year: 1986 }, { day: 7, weekDay: 2, month: 9, year: 1986 }, { day: 8, weekDay: 3, month: 9, year: 1986 }, { day: 9, weekDay: 4, month: 9, year: 1986 }, { day: 10, weekDay: 5, month: 9, year: 1986 }, { day: 11, weekDay: 6, month: 9, year: 1986 }, { day: 12, weekDay: 0, month: 9, year: 1986 }, { day: 13, weekDay: 1, month: 9, year: 1986 }, { day: 14, weekDay: 2, month: 9, year: 1986 }, { day: 15, weekDay: 3, month: 9, year: 1986 }, { day: 16, weekDay: 4, month: 9, year: 1986 }, { day: 17, weekDay: 5, month: 9, year: 1986 }, { day: 18, weekDay: 6, month: 9, year: 1986 }, { day: 19, weekDay: 0, month: 9, year: 1986 }, { day: 20, weekDay: 1, month: 9, year: 1986 }, { day: 21, weekDay: 2, month: 9, year: 1986 }, { day: 22, weekDay: 3, month: 9, year: 1986 }, { day: 23, weekDay: 4, month: 9, year: 1986 }, { day: 24, weekDay: 5, month: 9, year: 1986 }, { day: 25, weekDay: 6, month: 9, year: 1986 }, { day: 26, weekDay: 0, month: 9, year: 1986 }, { day: 27, weekDay: 1, month: 9, year: 1986 }, { day: 28, weekDay: 2, month: 9, year: 1986 }, { day: 29, weekDay: 3, month: 9, year: 1986 }, { day: 30, weekDay: 4, month: 9, year: 1986 }, { day: 31, weekDay: 5, month: 9, year: 1986 }, { day: 1, weekDay: 6, month: 10, year: 1986, siblingMonth: true }, { day: 2, weekDay: 0, month: 10, year: 1986, siblingMonth: true } ]);
		done();
	});

	it('should return a valid calendar with sibling months and selected dates', function (done) {
		var calendar = new Calendar({ siblingMonths: true, startDate: { day: 5, month: 10, year: 2010 }, endDate: { day: 20, month: 10, year: 2010 } }),
			calendarDays = calendar.getCalendar(2010, 10);
		assert.deepEqual(calendarDays, [ { day: 31, weekDay: 0, month: 9, year: 2010, siblingMonth: true, selected: false }, { day: 1, weekDay: 1, month: 10, year: 2010, selected: false }, { day: 2, weekDay: 2, month: 10, year: 2010, selected: false }, { day: 3, weekDay: 3, month: 10, year: 2010, selected: false }, { day: 4, weekDay: 4, month: 10, year: 2010, selected: false }, { day: 5, weekDay: 5, month: 10, year: 2010, selected: true }, { day: 6, weekDay: 6, month: 10, year: 2010, selected: true }, { day: 7, weekDay: 0, month: 10, year: 2010, selected: true }, { day: 8, weekDay: 1, month: 10, year: 2010, selected: true }, { day: 9, weekDay: 2, month: 10, year: 2010, selected: true }, { day: 10, weekDay: 3, month: 10, year: 2010, selected: true }, { day: 11, weekDay: 4, month: 10, year: 2010, selected: true }, { day: 12, weekDay: 5, month: 10, year: 2010, selected: true }, { day: 13, weekDay: 6, month: 10, year: 2010, selected: true }, { day: 14, weekDay: 0, month: 10, year: 2010, selected: true }, { day: 15, weekDay: 1, month: 10, year: 2010, selected: true }, { day: 16, weekDay: 2, month: 10, year: 2010, selected: true }, { day: 17, weekDay: 3, month: 10, year: 2010, selected: true }, { day: 18, weekDay: 4, month: 10, year: 2010, selected: true }, { day: 19, weekDay: 5, month: 10, year: 2010, selected: true }, { day: 20, weekDay: 6, month: 10, year: 2010, selected: true }, { day: 21, weekDay: 0, month: 10, year: 2010, selected: false }, { day: 22, weekDay: 1, month: 10, year: 2010, selected: false }, { day: 23, weekDay: 2, month: 10, year: 2010, selected: false }, { day: 24, weekDay: 3, month: 10, year: 2010, selected: false }, { day: 25, weekDay: 4, month: 10, year: 2010, selected: false }, { day: 26, weekDay: 5, month: 10, year: 2010, selected: false }, { day: 27, weekDay: 6, month: 10, year: 2010, selected: false }, { day: 28, weekDay: 0, month: 10, year: 2010, selected: false }, { day: 29, weekDay: 1, month: 10, year: 2010, selected: false }, { day: 30, weekDay: 2, month: 10, year: 2010, selected: false }, { day: 1, weekDay: 3, month: 11, year: 2010, siblingMonth: true, selected: false }, { day: 2, weekDay: 4, month: 11, year: 2010, siblingMonth: true, selected: false }, { day: 3, weekDay: 5, month: 11, year: 2010, siblingMonth: true, selected: false }, { day: 4, weekDay: 6, month: 11, year: 2010, siblingMonth: true, selected: false } ]);
		done();
	});

	it('should return a valid calendar with week numbers for Jan 2012', function (done) {
		var calendar = new Calendar({ siblingMonths: true, weekNumbers: true }),
			calendarDays = calendar.getCalendar(2012, 0);
		assert.deepEqual(calendarDays, [{day:1,weekDay:0,month:0,year:2012,weekNumber:52},{day:2,weekDay:1,month:0,year:2012,weekNumber:1},{day:3,weekDay:2,month:0,year:2012,weekNumber:1},{day:4,weekDay:3,month:0,year:2012,weekNumber:1},{day:5,weekDay:4,month:0,year:2012,weekNumber:1},{day:6,weekDay:5,month:0,year:2012,weekNumber:1},{day:7,weekDay:6,month:0,year:2012,weekNumber:1},{day:8,weekDay:0,month:0,year:2012,weekNumber:1},{day:9,weekDay:1,month:0,year:2012,weekNumber:2},{day:10,weekDay:2,month:0,year:2012,weekNumber:2},{day:11,weekDay:3,month:0,year:2012,weekNumber:2},{day:12,weekDay:4,month:0,year:2012,weekNumber:2},{day:13,weekDay:5,month:0,year:2012,weekNumber:2},{day:14,weekDay:6,month:0,year:2012,weekNumber:2},{day:15,weekDay:0,month:0,year:2012,weekNumber:2},{day:16,weekDay:1,month:0,year:2012,weekNumber:3},{day:17,weekDay:2,month:0,year:2012,weekNumber:3},{day:18,weekDay:3,month:0,year:2012,weekNumber:3},{day:19,weekDay:4,month:0,year:2012,weekNumber:3},{day:20,weekDay:5,month:0,year:2012,weekNumber:3},{day:21,weekDay:6,month:0,year:2012,weekNumber:3},{day:22,weekDay:0,month:0,year:2012,weekNumber:3},{day:23,weekDay:1,month:0,year:2012,weekNumber:4},{day:24,weekDay:2,month:0,year:2012,weekNumber:4},{day:25,weekDay:3,month:0,year:2012,weekNumber:4},{day:26,weekDay:4,month:0,year:2012,weekNumber:4},{day:27,weekDay:5,month:0,year:2012,weekNumber:4},{day:28,weekDay:6,month:0,year:2012,weekNumber:4},{day:29,weekDay:0,month:0,year:2012,weekNumber:4},{day:30,weekDay:1,month:0,year:2012,weekNumber:5},{day:31,weekDay:2,month:0,year:2012,weekNumber:5},{day:1,weekDay:3,month:1,year:2012,siblingMonth:true,weekNumber:5},{day:2,weekDay:4,month:1,year:2012,siblingMonth:true,weekNumber:5},{day:3,weekDay:5,month:1,year:2012,siblingMonth:true,weekNumber:5},{day:4,weekDay:6,month:1,year:2012,siblingMonth:true,weekNumber:5}]);
		done();
	});

	it('should return a valid calendar with week numbers for Dec 2019', function (done) {
		var calendar = new Calendar({ siblingMonths: true, weekNumbers: true }),
			calendarDays = calendar.getCalendar(2019, 11);
		assert.deepEqual(calendarDays, [{day:1,weekDay:0,month:11,year:2019,weekNumber:48},{day:2,weekDay:1,month:11,year:2019,weekNumber:49},{day:3,weekDay:2,month:11,year:2019,weekNumber:49},{day:4,weekDay:3,month:11,year:2019,weekNumber:49},{day:5,weekDay:4,month:11,year:2019,weekNumber:49},{day:6,weekDay:5,month:11,year:2019,weekNumber:49},{day:7,weekDay:6,month:11,year:2019,weekNumber:49},{day:8,weekDay:0,month:11,year:2019,weekNumber:49},{day:9,weekDay:1,month:11,year:2019,weekNumber:50},{day:10,weekDay:2,month:11,year:2019,weekNumber:50},{day:11,weekDay:3,month:11,year:2019,weekNumber:50},{day:12,weekDay:4,month:11,year:2019,weekNumber:50},{day:13,weekDay:5,month:11,year:2019,weekNumber:50},{day:14,weekDay:6,month:11,year:2019,weekNumber:50},{day:15,weekDay:0,month:11,year:2019,weekNumber:50},{day:16,weekDay:1,month:11,year:2019,weekNumber:51},{day:17,weekDay:2,month:11,year:2019,weekNumber:51},{day:18,weekDay:3,month:11,year:2019,weekNumber:51},{day:19,weekDay:4,month:11,year:2019,weekNumber:51},{day:20,weekDay:5,month:11,year:2019,weekNumber:51},{day:21,weekDay:6,month:11,year:2019,weekNumber:51},{day:22,weekDay:0,month:11,year:2019,weekNumber:51},{day:23,weekDay:1,month:11,year:2019,weekNumber:52},{day:24,weekDay:2,month:11,year:2019,weekNumber:52},{day:25,weekDay:3,month:11,year:2019,weekNumber:52},{day:26,weekDay:4,month:11,year:2019,weekNumber:52},{day:27,weekDay:5,month:11,year:2019,weekNumber:52},{day:28,weekDay:6,month:11,year:2019,weekNumber:52},{day:29,weekDay:0,month:11,year:2019,weekNumber:52},{day:30,weekDay:1,month:11,year:2019,weekNumber:1},{day:31,weekDay:2,month:11,year:2019,weekNumber:1},{day:1,weekDay:3,month:0,year:2020,siblingMonth:true,weekNumber:1},{day:2,weekDay:4,month:0,year:2020,siblingMonth:true,weekNumber:1},{day:3,weekDay:5,month:0,year:2020,siblingMonth:true,weekNumber:1},{day:4,weekDay:6,month:0,year:2020,siblingMonth:true,weekNumber:1}]);
		done();
	});

	it('should return a valid Feb 1990', function (done) {
		var calendar = new Calendar(),
			calendarDays = calendar.getCalendar(1990, 1);
		assert.equal(calendarDays[32], false);
		done();
	});

	it('should return a valid Feb 1996', function (done) {
		var calendar = new Calendar(),
			calendarDays = calendar.getCalendar(1996, 1);
		assert.deepEqual(calendarDays[32], { day: 29, weekDay: 4, month: 1, year: 1996 });
		done();
	});

	it('should return a valid Feb 2000', function (done) {
		var calendar = new Calendar(),
			calendarDays = calendar.getCalendar(2000, 1);
		assert.deepEqual(calendarDays[30], { day: 29, weekDay: 2, month: 1, year: 2000 });
		done();
	});

	it('should return a valid Feb 2100', function (done) {
		var calendar = new Calendar(),
			calendarDays = calendar.getCalendar(2100, 1);
		assert.equal(calendarDays[29], false);
		done();
	});

	it('should adjust the month number', function (done) {
		var calendar = new Calendar(),
			calendarDays = calendar.getCalendar(2010, 12);
		assert.equal(calendarDays[15].month, 0);
		assert.equal(calendarDays[15].year, 2011);
		done();
	});

	it('should return valid date selection states for same month', function (done) {
		var calendar = new Calendar();
		calendar.setStartDate({ year: 2010, month: 0, day: 15 });
		calendar.setEndDate({ year: 2010, month: 0, day: 17 });
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 14 }), false);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 16 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 17 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 18 }), false);
		done();
	});

	it('should return valid date selection states for same year', function (done) {
		var calendar = new Calendar();
		calendar.setStartDate({ year: 2010, month: 1, day: 15 });
		calendar.setEndDate({ year: 2010, month: 3, day: 15 });
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 15 }), false);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 1, day: 14 }), false);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 1, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 1, day: 16 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 2, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 3, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 3, day: 16 }), false);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 4, day: 15 }), false);
		done();
	});

	it('should return valid date selection states for multiple years', function (done) {
		var calendar = new Calendar();
		calendar.setStartDate({ year: 2010, month: 1, day: 15 });
		calendar.setEndDate({ year: 2012, month: 1, day: 15 });
		assert.equal(calendar.isDateSelected({ year: 2010, month: 0, day: 15 }), false);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 1, day: 14 }), false);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 1, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2010, month: 11, day: 31 }), true);
		assert.equal(calendar.isDateSelected({ year: 2011, month: 0, day: 1 }), true);
		assert.equal(calendar.isDateSelected({ year: 2011, month: 1, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2011, month: 11, day: 31 }), true);
		assert.equal(calendar.isDateSelected({ year: 2012, month: 1, day: 15 }), true);
		assert.equal(calendar.isDateSelected({ year: 2012, month: 1, day: 16 }), false);
		done();
	});

	it('should return valid date diffs', function (done) {
		assert.equal(Calendar.diff({ year: 2016, month: 2, day: 1 }, { year: 2016, month: 1, day: 1 }), 29);
		assert.equal(Calendar.diff({ year: 2010, month: 0, day: 1 }, { year: 2011, month: 0, day: 1 }), -365);
		done();
	});

	it('should return valid date intervals', function (done) {
		assert.equal(Calendar.interval({ year: 1986, month: 1, day: 16 }, { year: 1986, month: 1, day: 16 }), 1);
		assert.equal(Calendar.interval({ year: 1986, month: 1, day: 10 }, { year: 1986, month: 2, day: 10 }), 29);
		assert.equal(Calendar.interval({ year: 1986, month: 0, day: 1 }, { year: 1986, month: 11, day: 31 }), 365);
		assert.equal(Calendar.interval({ year: 1990, month: 0, day: 1 }, { year: 1990, month: 11, day: 31 }), 365);
		assert.equal(Calendar.interval({ year: 1996, month: 0, day: 1 }, { year: 1996, month: 11, day: 31 }), 366);
		assert.equal(Calendar.interval({ year: 2000, month: 0, day: 1 }, { year: 2000, month: 11, day: 31 }), 366);
		assert.equal(Calendar.interval({ year: 2100, month: 0, day: 1 }, { year: 2100, month: 11, day: 31 }), 365);
		done();
	});

	it('should set starting date', function (done) {
		var calendar = new Calendar();
		calendar.setStartDate({ year: 2010, month: 1, day: 15 });
		assert.deepEqual(calendar.startDate, { year: 2010, month: 1, day: 15 });
		done();
	});

	it('should set ending date', function (done) {
		var calendar = new Calendar();
		calendar.setEndDate({ year: 2010, month: 1, day: 15 });
		assert.deepEqual(calendar.endDate, { year: 2010, month: 1, day: 15 });
		done();
	});

	it('should return valid days in month', function (done) {
		assert.equal(Calendar.daysInMonth(1988, 1), 29);
		assert.equal(Calendar.daysInMonth(1988, 7), 31);
		assert.equal(Calendar.daysInMonth(2015, 10), 30);
		done();
	});

});
