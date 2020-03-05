export interface CalendarDate {
  day: number;
  month: number;
  selected?: boolean;
  siblingMonth?: boolean;
  weekDay?: number;
  weekNumber?: number;
  year: number;
}

/**
 * Calendar object
 */
class Calendar {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  siblingMonths: boolean;
  weekNumbers: boolean;
  weekStart: number;

  /**
   * Calendar constructor
   *
   * @param  options  Calendar options
   */
  constructor({
    startDate = null,
    endDate = null,
    siblingMonths = false,
    weekNumbers = false,
    weekStart = 0,
  }: {
    /**
     * Date object indicating the selected start date
     */
    startDate?: CalendarDate | null;

    /**
     * Date object indicating the selected end date
     */
    endDate?: CalendarDate | null;

    /**
     * Calculate dates from sibling months (before and after the current month, based on weekStart)
     */
    siblingMonths?: boolean;

    /**
     * Calculate the week days
     */
    weekNumbers?: boolean;

    /**
     * Day of the week to start the calendar, respects `Date.prototype.getDay` (defaults to `0`, Sunday)
     */
    weekStart?: number;
  } = {}) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.siblingMonths = siblingMonths;
    this.weekNumbers = weekNumbers;
    this.weekStart = weekStart;
  }

  /**
   * Calculate a calendar month
   *
   * @param   year   Year
   * @param   month  Month [0-11]
   * @return         Calendar days
   */
  getCalendar(year: number, month: number) {
    const date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));

    year = date.getUTCFullYear();
    month = date.getUTCMonth();

    const calendar: (CalendarDate | false)[] = [];
    const firstDay = date.getUTCDay();
    const firstDate = -((7 - this.weekStart + firstDay) % 7);
    const lastDate = Calendar.daysInMonth(year, month);
    const lastDay = (lastDate - firstDate) % 7;
    const lastDatePreviousMonth = Calendar.daysInMonth(year, month - 1);

    let i = firstDate;
    let currentDay;
    let currentDate;
    let currentDateObject: CalendarDate | false = false;
    let currentWeekNumber = null;
    let otherMonth;
    let otherYear;

    const max = lastDate - i + (lastDay !== 0 ? 7 - lastDay : 0) + firstDate;

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
              otherYear--;
            }
            currentDate = lastDatePreviousMonth + currentDate;
          } else if (currentDate > lastDate) {
            otherMonth = month + 1;
            otherYear = year;
            if (otherMonth > 11) {
              otherMonth = 0;
              otherYear++;
            }
            currentDate = i - lastDate + 1;
          }

          if (otherMonth !== undefined && otherYear !== undefined) {
            currentDateObject = {
              day: currentDate,
              weekDay: currentDay,
              month: otherMonth,
              year: otherYear,
              siblingMonth: true,
            };
          }
        } else {
          currentDateObject = false;
        }
      } else {
        currentDateObject = {
          day: currentDate,
          weekDay: currentDay,
          month: month,
          year: year,
        };
      }

      if (currentDateObject && this.weekNumbers) {
        if (currentWeekNumber === null) {
          currentWeekNumber = Calendar.calculateWeekNumber(currentDateObject);
        } else if (currentDay === 1 && currentWeekNumber === 52) {
          currentWeekNumber = 1;
        } else if (currentDay === 1) {
          currentWeekNumber++;
        }
        currentDateObject.weekNumber = currentWeekNumber;
      }

      if (currentDateObject && this.startDate) {
        currentDateObject.selected = this.isDateSelected(currentDateObject);
      }

      calendar.push(currentDateObject);
      i++;
    }

    return calendar;
  }

  /**
   * Checks if a date is selected
   *
   * @param   date  Date object
   * @return        Selected status of the date
   */
  isDateSelected(date: CalendarDate) {
    if (!this.startDate) {
      return false;
    }

    if (
      date.year === this.startDate.year &&
      date.month === this.startDate.month &&
      date.day === this.startDate.day
    ) {
      return true;
    }

    if (!this.endDate) {
      return false;
    }

    if (
      date.year === this.startDate.year &&
      date.month === this.startDate.month &&
      date.day < this.startDate.day
    ) {
      return false;
    }

    if (
      date.year === this.endDate.year &&
      date.month === this.endDate.month &&
      date.day > this.endDate.day
    ) {
      return false;
    }

    if (
      date.year === this.startDate.year &&
      date.month < this.startDate.month
    ) {
      return false;
    }

    if (date.year === this.endDate.year && date.month > this.endDate.month) {
      return false;
    }

    if (date.year < this.startDate.year) {
      return false;
    }

    if (date.year > this.endDate.year) {
      return false;
    }

    return true;
  }

  /**
   * Sets the selected period start
   *
   * @param  date  Date object
   */
  setStartDate(date: CalendarDate) {
    this.startDate = date;
  }

  /**
   * Sets the selected period end
   *
   * @param  date  Date object
   */
  setEndDate(date: CalendarDate) {
    this.endDate = date;
  }

  /**
   * Sets one selected date
   *
   * @param  date  Date object
   */
  setDate(date: CalendarDate) {
    return this.setStartDate(date);
  }

  /**
   * Calculates the difference between two dates (date1 - date2), in days
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return             Days between the dates
   */
  static diff(dateLeft: CalendarDate, dateRight: CalendarDate) {
    const dateLeftDate = new Date(
      Date.UTC(dateLeft.year, dateLeft.month, dateLeft.day, 0, 0, 0, 0)
    );
    const dateRightDate = new Date(
      Date.UTC(dateRight.year, dateRight.month, dateRight.day, 0, 0, 0, 0)
    );
    return Math.ceil(
      (dateLeftDate.getTime() - dateRightDate.getTime()) / 86400000
    );
  }

  /**
   * Calculates the interval between two dates
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return             Number of days between dates
   */
  static interval(dateLeft: CalendarDate, dateRight: CalendarDate) {
    return Math.abs(Calendar.diff(dateLeft, dateRight)) + 1;
  }

  /**
   * Quickly compare two dates
   *
   * @param   dateLeft   Left `CalendarDate` object
   * @param   dateRight  Right `CalendarDate` object
   * @return             Comparison result: -1 (left < right), 0 (equal) or 1 (left > right)
   */
  static compare(dateLeft: CalendarDate, dateRight: CalendarDate) {
    if (
      typeof dateLeft !== 'object' ||
      typeof dateRight !== 'object' ||
      dateLeft === null ||
      dateRight === null
    ) {
      throw new TypeError('dates must be objects');
    }

    if (dateLeft.year < dateRight.year) {
      return -1;
    }

    if (dateLeft.year > dateRight.year) {
      return 1;
    }

    if (dateLeft.month < dateRight.month) {
      return -1;
    }

    if (dateLeft.month > dateRight.month) {
      return 1;
    }

    if (dateLeft.day < dateRight.day) {
      return -1;
    }

    if (dateLeft.day > dateRight.day) {
      return 1;
    }

    return 0;
  }

  /**
   * Calculates the number of days in a month
   *
   * @param   year  Year
   * @param   month Month [0-11]
   * @return        Length of the month
   */
  static daysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * Calculates if a given year is a leap year
   *
   * @param   year  Year
   * @return        Leap year or not
   */
  static isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /**
   * Calculates the week number for a given date
   *
   * @param   date  Date object
   * @return        Week number
   */
  // Adapted from http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
  static calculateWeekNumber(date: CalendarDate) {
    // Creates the requested date
    const current = new Date(
      Date.UTC(date.year, date.month, date.day, 0, 0, 0, 0)
    );

    // Create a copy of the object
    const target = new Date(current.valueOf());

    // ISO week date weeks start on monday so correct the day number
    const dayNr = (current.getUTCDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week with the first thursday of that
    // year. Set the target date to the thursday in the target week.
    target.setUTCDate(target.getUTCDate() - dayNr + 3);

    // Store the millisecond value of the target date
    const firstThursday = target.valueOf();

    // Set the target to the first thursday of the year

    // First set the target to january first
    target.setUTCMonth(0, 1);

    // Not a thursday? Correct the date to the next thursday
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
    }

    // The week number is the number of weeks between the  first thursday of the
    // year and the thursday in the target week.
    // 604800000 = 7 * 24 * 3600 * 1000
    return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  }
}

/**
 * Exports the Calendar
 */
export { Calendar };
