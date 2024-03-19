/* MIT License

Copyright (c) [2018] [Greg Thomas]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

var dateInput = "11/27/24";

function isTodayAHoliday(dateInput) {

  /* 
      We need to be able to get the week number of the month
      This does that.
  */


  function getMonthWeek(dateString) {
    let date = new Date(dateString);
    var weekOfMonth = (0 | date.getDate() / 7) + 1;
    return weekOfMonth;
  }
  /* 
  find what date the nth occurrence of y day falls on
  */
  function nthWeekdayOfMonth(weekday, n, idate) {
    var imonth = idate.getMonth();
    var idate = new Date(date.getFullYear(), imonth, 1),
      add = (weekday - idate.getDay() + 7) % 7 + (n - 1) * 7;
    // don't  leave current month!  Related to occurrence value of 5 below
    do {
      idate.setMonth(imonth);
      idate.setDate(1 + add);
      add -= 7;
    } while (idate.getMonth() != imonth);
    idate.setDate(idate.getDate());
    idate.setFullYear(year);
    return idate;
  }

  /*
      Variable declarations -- don't change.
  */
  var date = new Date(dateInput);
  var formattedDate = new Date(date);
  var week = getMonthWeek(formattedDate);
  var day = formattedDate.getDay();
  var month = formattedDate.getMonth();
  var year = formattedDate.getFullYear();
  var currentDate = formattedDate.getDate();
  var isHoliday = false;

  // variables used for observedInput
  var observed = 1;
  var thisdate = new Date(dateInput);
  var thisday = thisdate.getDay();



  /* 
  Floating Holidays: Count month from 0, occurrence from 1, dayOfWeek from 0.
  Month is the month that the holiday occurrs in
  Occurrence is the nth occurrence of the day of week
  dayOfWeek is the day of the week, 0=sunday 6=saturday.
  IE, for the 3rd Monday in January, month=0, occurrence=3, dayOfWeek=1
  For last occurrence of a day in a month, use a number >= 5
  */
  var floatingHolidays = {
    "holiday": [{
        "name": "MLK Day",
        "month": "0",
        "occurrence": "3",
        "dayOfWeek": "1"
      },
      {
        "name": "Fathers Day",
        "month": "5",
        "occurrence": "3",
        "dayOfWeek": "0"
      },
      {
        "name": "Presidents Day",
        "month": "1",
        "occurrence": "3",
        "dayOfWeek": "1"
      },
      {
        "name": "Mothers Day",
        "month": "4",
        "occurrence": "2",
        "dayOfWeek": "0"
      },
      {
        "name": "Memorial Day",
        "month": "4",
        "occurrence": "5",
        "dayOfWeek": "1"
      },
      {
        "name": "Parents Day",
        "month": "6",
        "occurrence": "3",
        "dayOfWeek": "0"
      },
      {
        "name": "Grandparents Day",
        "month": "8",
        "occurrence": "2",
        "dayOfWeek": "0"
      },
      {
        "name": "Labor Day",
        "month": "8",
        "occurrence": "1",
        "dayOfWeek": "1"
      },
      {
        "name": "Columbus Day",
        "month": "9",
        "occurrence": "2",
        "dayOfWeek": "1"
      },
      {
        "name": "Thanksgiving",
        "month": "10",
        "occurrence": "4",
        "dayOfWeek": "4"
      },
      //    {"name":"Thanksgiving Eve","month":"10","occurrence":"4","dayOfWeek":"3"},	
    ]
  };
  /* 
  For fixed holidays, the key is month,daynumber with month counting from zero and day counting from 1
  Value of the key-value pair is the name of the holiday
  For example, February 28th - fake holiday - would be input as "1,28":"fake holiday"
  */
  var fixedHolidays = {
    "0,1": "New Years Day",
    "1,14": "Valentines Day",
    "3,15": "Tax Day",
    "5,19": "Juneteenth",
    "6,4": "Independence Day",
    "10,11": "Veterans Day",
    "11,24": "Christmas Eve",
    "11,25": "Christmas Day",
    "11,31": "New Years Eve",
    "1,1": "Test Holiday"
  }
  /* 
  These values are hard coded
  */
  var relationalHolidays = {
    "holiday": [{
        "name": "Thanksgiving Eve",
        "relatedTo": "Thanksgiving",
        "offset": -1
      },
      {
        "name": "Black Friday",
        "relatedTo": "Thanksgiving",
        "offset": 1
      },
      {
        "name": "Good Friday",
        "relatedTo": "Easter",
        "offset": 1
      }

    ]
  }
  // Attach dates to objects
function setHolidayDates() {
  var loopLength = floatingHolidays.holiday.length;
//  console.log(`Loop through ${loopLength} holidays`);
  for (let i = 0; i < loopLength; i++) {
    var hdate = nthWeekdayOfMonth(floatingHolidays.holiday[i].dayOfWeek, floatingHolidays.holiday[i].occurrence, new Date(year, floatingHolidays.holiday[i].month, 1));
    floatingHolidays.holiday[i].date = hdate;
		for (let index = 0; index < relationalHolidays.holiday.length; index++) {
    	var rdate = new Date(hdate.valueOf());
      rdate.setDate(rdate.getDate() + relationalHolidays.holiday[index].offset);
      relationalHolidays.holiday[index].date = rdate;
    }
  }
}


  // Detect if input date is holiday
  function getHoliday(month, week, day, currentDate) {
    setHolidayDates();
    var easterDate = getEaster(year);
    //
    //  ***** Comment out below line to disable Easter *****
    //
    floatingHolidays.holiday.push({
      "name": "Easter",
      "date": easterDate
    });
    var gfDate = new Date(easterDate.valueOf());
    gfDate.setDate(gfDate.getDate() - 2);
    relationalHolidays.holiday[1].date = gfDate;
    var i;

    for (i = 0; i < Object.keys(floatingHolidays.holiday).length; i++) {
      var tempVar = JSON.stringify(floatingHolidays.holiday[i]);
      var holidayMonth = floatingHolidays.holiday[i].date.getMonth();
      var holidayDate = floatingHolidays.holiday[i].date.getDate();
      //      console.log(`${tempVar} ${holidayMonth}`);
      if (holidayMonth == month && holidayDate == currentDate) {
        //        console.log(`Floating holiday detected! ${floatingHolidays.holiday[i].name}`);
        isHoliday = true;
        return {
          "isHoliday": "true",
          "holiday": floatingHolidays.holiday[i].name
        };
      }
      //      console.log(`${tempVar}`);
    }

    if (isHoliday == false) {
      for (i = 0; i < Object.keys(relationalHolidays.holiday).length; i++) {
        //        console.log(relationalHolidays.holiday[i].date);
        var holidayMonth = relationalHolidays.holiday[i].date.getMonth();
        var holidayDate = relationalHolidays.holiday[i].date.getDate();

        /****************************
         ***** Comment out below "if" to remove relational Holidays *****
         ****************************/

        /*No Relational Holidays!!*/
        if (holidayMonth == month && holidayDate == currentDate) {
          return {
            "isHoliday": "true",
            "holiday": relationalHolidays.holiday[i].name
          };
          //         console.log(`Relational Holiday Detected! ${relationalHolidays.holiday[i].name}`);
        }

      }
    }
    if (fixedHolidays[month + "," + currentDate] != null) {
      //        console.log(`Static holiday detected! ${fixedHolidays[month + "," + currentDate]}`);
      isHoliday = true;
      return {
        "isHoliday": "true",
        "holiday": fixedHolidays[month + "," + currentDate]
      };
    }

    /*
    check if Observed set to 1 or 2.If 1, and not a holiay and current day is Friday, set date to tomorrow, if Observed
    set, current day is Monday, set date to yesterday. If 2 and not a holiay and current day is Friday,do not set date to tomorrow, if Observed
    set, current day is Monday, set date to yesterday.
    */

    if (isHoliday == false) {
      if (observed == 1) {
        if (thisday == 5) {
          currentDate++
        }
        if (thisday == 1) {
          currentDate--
        }
      } else if (observed == 2) {
        if (thisday == 1) {
          currentDate--
        }
      } else if (thisday == 3) {
        currentDate++
      }
      if (fixedHolidays[month + "," + currentDate] != null) {
        //        console.log(`Static holiday detected! ${fixedHolidays[month + "," + currentDate]}`);
        isHoliday = true;
        return {
          "isHoliday": "true",
          "holiday": fixedHolidays[month + "," + currentDate]
        };
      }
    }


    if (!isHoliday) {
      return {
        "isHoliday": "false"
      };
    }
  }
  /*
      This calculates easter.
  */
  function getEaster(year) {
    var f = Math.floor,
      // Golden Number - 1
      G = year % 19,
      C = f(year / 100),
      // related to Epact
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
      // number of days from 21 March to the Paschal full moon
      I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
      // weekday for the Paschal full moon
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
      // number of days from 21 March to the Sunday on or before the Paschal full moon
      L = I - J,
      month = 3 + f((L + 40) / 44),
      day = L + 28 - 31 * f(month / 4);
    month -= 1;
    var easterDate = new Date(year, month, day);
    return easterDate;
  }
  // Execute code
  var currentHoliday = getHoliday(month, week, day, currentDate);
  if (typeof currentHoliday.holiday == "undefined") { currentHoliday.holiday = "No Holiday"; }
  //console.log(currentHoliday);
  //process.exit;
  return currentHoliday;
}

var result = isTodayAHoliday(dateInput);
console.log(result);
