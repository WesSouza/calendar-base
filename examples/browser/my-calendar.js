(function () {
	'use strict'

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	var calendar = new calendarBase.Calendar({ siblingMonths: true, weekStart: true })
	var today = new Date()
	var $calendarMonth = document.querySelector('.js-calendar-month'),
		$calendar = document.querySelector('.js-calendar')

	$calendarMonth.innerHTML = months[today.getUTCMonth()]

	calendar.getCalendar(today.getUTCFullYear(), today.getUTCMonth()).forEach(function (date) {
		var div = document.createElement('li')
		if (date) {
			div.className = 'calendar-day'+ (date.siblingMonth ? ' -sibling-month': '')
			div.innerHTML = date.day
		}
		$calendar.appendChild(div)
	})

}())
