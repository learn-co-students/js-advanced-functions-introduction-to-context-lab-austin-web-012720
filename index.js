function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(array) {
  let employeeArray = [];

  array.forEach(element => {
    employeeArray.push(createEmployeeRecord(element));
  });

  return employeeArray;
}

function createTimeInEvent(employee, time) {
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(
      time
        .split('')
        .slice(11, 15)
        .join('')
    ),
    date: time
      .split('')
      .slice(0, 10)
      .join('')
  });

  return employee;
}

function createTimeOutEvent(employee, time) {
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(
      time
        .split('')
        .slice(11, 15)
        .join('')
    ),
    date: time
      .split('')
      .slice(0, 10)
      .join('')
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let inTime = employee.timeOutEvents.find(e => e.date === date);
  let outTime = employee.timeInEvents.find(e => e.date === date);
  return (inTime.hour - outTime.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let totalWages = 0;
  return employee.timeOutEvents.reduce(
    (accumulator, event) => accumulator + wagesEarnedOnDate(employee, event.date),
    totalWages
  );
}

function calculatePayroll(employeeArray) {
  let payroll = 0;
  return employeeArray.reduce(
    (accumulator, employee) => accumulator + allWagesFor(employee),
    payroll
  );
}

function findEmployeeByFirstName(employeeArray, name){
  return employeeArray.find(employee => employee.firstName === name)
}
