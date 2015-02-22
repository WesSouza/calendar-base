var assert = require( 'assert' ),
	calendarBase = require( '..' );

describe( 'calendar-base', function ( ) {

	it( 'should return a valid calendar for Oct 1986', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar(),
			calendar = calendarGenerator.getCalendar( 1986, 9 );
		assert.deepEqual( calendar, [ false, false, false, { day: 1, weekDay: 3, month: 9, year: 1986 }, { day: 2, weekDay: 4, month: 9, year: 1986 }, { day: 3, weekDay: 5, month: 9, year: 1986 }, { day: 4, weekDay: 6, month: 9, year: 1986 }, { day: 5, weekDay: 0, month: 9, year: 1986 }, { day: 6, weekDay: 1, month: 9, year: 1986 }, { day: 7, weekDay: 2, month: 9, year: 1986 }, { day: 8, weekDay: 3, month: 9, year: 1986 }, { day: 9, weekDay: 4, month: 9, year: 1986 }, { day: 10, weekDay: 5, month: 9, year: 1986 }, { day: 11, weekDay: 6, month: 9, year: 1986 }, { day: 12, weekDay: 0, month: 9, year: 1986 }, { day: 13, weekDay: 1, month: 9, year: 1986 }, { day: 14, weekDay: 2, month: 9, year: 1986 }, { day: 15, weekDay: 3, month: 9, year: 1986 }, { day: 16, weekDay: 4, month: 9, year: 1986 }, { day: 17, weekDay: 5, month: 9, year: 1986 }, { day: 18, weekDay: 6, month: 9, year: 1986 }, { day: 19, weekDay: 0, month: 9, year: 1986 }, { day: 20, weekDay: 1, month: 9, year: 1986 }, { day: 21, weekDay: 2, month: 9, year: 1986 }, { day: 22, weekDay: 3, month: 9, year: 1986 }, { day: 23, weekDay: 4, month: 9, year: 1986 }, { day: 24, weekDay: 5, month: 9, year: 1986 }, { day: 25, weekDay: 6, month: 9, year: 1986 }, { day: 26, weekDay: 0, month: 9, year: 1986 }, { day: 27, weekDay: 1, month: 9, year: 1986 }, { day: 28, weekDay: 2, month: 9, year: 1986 }, { day: 29, weekDay: 3, month: 9, year: 1986 }, { day: 30, weekDay: 4, month: 9, year: 1986 }, { day: 31, weekDay: 5, month: 9, year: 1986 }, false ] );
		done();
	} );

	it( 'should return a valid calendar for Oct 1986 with sibling months', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar( { siblingMonths: true } ),
			calendar = calendarGenerator.getCalendar( 1986, 9 );
		assert.deepEqual( calendar, [ { day: 28, weekDay: 0, month: 8, year: 1986, siblingMonth: true }, { day: 29, weekDay: 1, month: 8, year: 1986, siblingMonth: true }, { day: 30, weekDay: 2, month: 8, year: 1986, siblingMonth: true }, { day: 1, weekDay: 3, month: 9, year: 1986 }, { day: 2, weekDay: 4, month: 9, year: 1986 }, { day: 3, weekDay: 5, month: 9, year: 1986 }, { day: 4, weekDay: 6, month: 9, year: 1986 }, { day: 5, weekDay: 0, month: 9, year: 1986 }, { day: 6, weekDay: 1, month: 9, year: 1986 }, { day: 7, weekDay: 2, month: 9, year: 1986 }, { day: 8, weekDay: 3, month: 9, year: 1986 }, { day: 9, weekDay: 4, month: 9, year: 1986 }, { day: 10, weekDay: 5, month: 9, year: 1986 }, { day: 11, weekDay: 6, month: 9, year: 1986 }, { day: 12, weekDay: 0, month: 9, year: 1986 }, { day: 13, weekDay: 1, month: 9, year: 1986 }, { day: 14, weekDay: 2, month: 9, year: 1986 }, { day: 15, weekDay: 3, month: 9, year: 1986 }, { day: 16, weekDay: 4, month: 9, year: 1986 }, { day: 17, weekDay: 5, month: 9, year: 1986 }, { day: 18, weekDay: 6, month: 9, year: 1986 }, { day: 19, weekDay: 0, month: 9, year: 1986 }, { day: 20, weekDay: 1, month: 9, year: 1986 }, { day: 21, weekDay: 2, month: 9, year: 1986 }, { day: 22, weekDay: 3, month: 9, year: 1986 }, { day: 23, weekDay: 4, month: 9, year: 1986 }, { day: 24, weekDay: 5, month: 9, year: 1986 }, { day: 25, weekDay: 6, month: 9, year: 1986 }, { day: 26, weekDay: 0, month: 9, year: 1986 }, { day: 27, weekDay: 1, month: 9, year: 1986 }, { day: 28, weekDay: 2, month: 9, year: 1986 }, { day: 29, weekDay: 3, month: 9, year: 1986 }, { day: 30, weekDay: 4, month: 9, year: 1986 }, { day: 31, weekDay: 5, month: 9, year: 1986 }, { day: 1, weekDay: 6, month: 10, year: 1986, siblingMonth: true } ] );
		done();
	} );

	it( 'should return a valid calendar for Oct 1986 with week starting Monday', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar( { siblingMonths: true, weekStart: 1 } ),
			calendar = calendarGenerator.getCalendar( 1986, 9 );
		assert.deepEqual( calendar, [ { day: 29, weekDay: 1, month: 8, year: 1986, siblingMonth: true }, { day: 30, weekDay: 2, month: 8, year: 1986, siblingMonth: true }, { day: 1, weekDay: 3, month: 9, year: 1986 }, { day: 2, weekDay: 4, month: 9, year: 1986 }, { day: 3, weekDay: 5, month: 9, year: 1986 }, { day: 4, weekDay: 6, month: 9, year: 1986 }, { day: 5, weekDay: 0, month: 9, year: 1986 }, { day: 6, weekDay: 1, month: 9, year: 1986 }, { day: 7, weekDay: 2, month: 9, year: 1986 }, { day: 8, weekDay: 3, month: 9, year: 1986 }, { day: 9, weekDay: 4, month: 9, year: 1986 }, { day: 10, weekDay: 5, month: 9, year: 1986 }, { day: 11, weekDay: 6, month: 9, year: 1986 }, { day: 12, weekDay: 0, month: 9, year: 1986 }, { day: 13, weekDay: 1, month: 9, year: 1986 }, { day: 14, weekDay: 2, month: 9, year: 1986 }, { day: 15, weekDay: 3, month: 9, year: 1986 }, { day: 16, weekDay: 4, month: 9, year: 1986 }, { day: 17, weekDay: 5, month: 9, year: 1986 }, { day: 18, weekDay: 6, month: 9, year: 1986 }, { day: 19, weekDay: 0, month: 9, year: 1986 }, { day: 20, weekDay: 1, month: 9, year: 1986 }, { day: 21, weekDay: 2, month: 9, year: 1986 }, { day: 22, weekDay: 3, month: 9, year: 1986 }, { day: 23, weekDay: 4, month: 9, year: 1986 }, { day: 24, weekDay: 5, month: 9, year: 1986 }, { day: 25, weekDay: 6, month: 9, year: 1986 }, { day: 26, weekDay: 0, month: 9, year: 1986 }, { day: 27, weekDay: 1, month: 9, year: 1986 }, { day: 28, weekDay: 2, month: 9, year: 1986 }, { day: 29, weekDay: 3, month: 9, year: 1986 }, { day: 30, weekDay: 4, month: 9, year: 1986 }, { day: 31, weekDay: 5, month: 9, year: 1986 }, { day: 1, weekDay: 6, month: 10, year: 1986, siblingMonth: true }, { day: 2, weekDay: 0, month: 10, year: 1986, siblingMonth: true } ] );
		done();
	} );

	it( 'should return a valid Feb 1990', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar(),
			calendar = calendarGenerator.getCalendar( 1990, 1 );
		assert.equal( calendar[32], false );
		done();
	} );

	it( 'should return a valid Feb 1996', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar(),
			calendar = calendarGenerator.getCalendar( 1996, 1 );
		assert.deepEqual( calendar[32], { day: 29, weekDay: 4, month: 1, year: 1996 } );
		done();
	} );

	it( 'should return a valid Feb 2000', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar(),
			calendar = calendarGenerator.getCalendar( 2000, 1 );
		assert.deepEqual( calendar[30], { day: 29, weekDay: 2, month: 1, year: 2000 } );
		done();
	} );

	it( 'should return a valid Feb 2100', function ( done ) {
		var calendarGenerator = new calendarBase.Calendar(),
			calendar = calendarGenerator.getCalendar( 2100, 1 );
		assert.equal( calendar[29], false );
		done();
	} );

} );