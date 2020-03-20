function createEmployeeRecord(array) {
  return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
  }
};

let createEmployeeRecords = array => {
  return array.map(row => createEmployeeRecord(row));
};

let createTimeInEvent = (employee, dateStamp) => {
  let date = dateStamp.split(' ')[0];
  let hour = parseInt(dateStamp.split(' ')[1]);

  //the timeInEvents is an array from the initial employee object created in the first function
  employee.timeInEvents.push({
      type: "TimeIn",
      hour: hour, date
  });
  return employee;
};

let createTimeOutEvent = (employee, dateStamp) => {
  let date = dateStamp.split(' ')[0]; 
  let hour = parseInt(dateStamp.split(' ')[1]);
  
  //timeOutEvents is also a key in the employee object created in the first function
  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: hour, date
  });
  return employee;
};

let hoursWorkedOnDate = (employee, dateToFind) => {
  let inEvent = employee.timeInEvents.find(arrayElement => arrayElement.date === dateToFind);

  let outEvent = employee.timeOutEvents.find(arrayElement => arrayElement.date === dateToFind);
  //inEvent and outEvent are objects that are returns from the timeInEvents and timeOutEvents array

  return (outEvent.hour - inEvent.hour) / 100;
  //example 1800 - 1200 / 100 to equal 6 hours of work
};

let wagesEarnedOnDate = (employee, dateToFind) => {
  return hoursWorkedOnDate(employee, dateToFind) * employee.payPerHour;
};

let allWagesFor = (employee) => {
  let eligibleDates = employee.timeInEvents.map( arrayElement => {
    return arrayElement.date;
  });

  let payable = eligibleDates.reduce((accumulator, dateToFind) => {
    return accumulator + wagesEarnedOnDate(employee, dateToFind)
  }, 0);

  return payable;
};

let findEmployeeByFirstName = (arrayOfEmployees, nameToMatch) => {
 return arrayOfEmployees.find(employee => employee.firstName === nameToMatch);
}; 

let calculatePayroll = arrayOfEmployeeObjects => {
  return arrayOfEmployeeObjects.reduce((accumulator, employee) => {
    return accumulator + allWagesFor(employee)
  }, 0);
}; 



