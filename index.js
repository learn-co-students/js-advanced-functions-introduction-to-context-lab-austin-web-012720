// Your code here

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (twoRows) => {
    return twoRows.map(array => createEmployeeRecord(array));
}

const createTimeInEvent = (record, event) => {
    let [date, time] = event.split(' ');

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    });
    return record;
}

const createTimeOutEvent = (record, event) => {
    let [date, time] = event.split(' ');

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    });
    return record;
}

const hoursWorkedOnDate = (record, date) => {
    let day = record.timeInEvents.find(day => day.date === date);
    let timeIn = day.hour;

    let out = record.timeOutEvents.find(day => day.date === date);
    let timeOut = out.hour;

    let hours = parseInt(timeOut, 10) - parseInt(timeIn, 10);
    return hours / 100;
}

const wagesEarnedOnDate = (record, date) => {
    let hours = hoursWorkedOnDate(record, date);

    let wage = record.payPerHour;
    return hours * wage;
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

