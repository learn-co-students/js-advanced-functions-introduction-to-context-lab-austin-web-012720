// Your code here
function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(arrays) {
  return arrays.map((arr) => createEmployeeRecord(arr));
}

let createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  const timeIn = {
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  };
  employee.timeInEvents.push(timeIn);
  return employee;
}

let createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  const timeOut = {
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  };
  employee.timeOutEvents.push(timeOut);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const startTime = employee.timeInEvents.find((event) => event.date === date);
  const endTime = employee.timeOutEvents.find((event) => event.date === date);
  return (endTime.hour / 100) - (startTime.hour / 100);
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map((event) => event.date);
  return dates.reduce((acc, curValue) => acc + wagesEarnedOnDate(employee, curValue), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find((employee) => employee.firstName === firstName);
}