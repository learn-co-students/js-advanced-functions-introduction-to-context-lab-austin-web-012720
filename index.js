function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
}
    
function createEmployeeRecords(employeeData) {
    return employeeData.map( detail => {
        return createEmployeeRecord(detail)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour,10),
        date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let inTime = employee.timeInEvents.find( event => {
        return event.date === date
    })
    let outTime = employee.timeOutEvents.find( event => {
        return event.date === date
    })
    return (outTime.hour - inTime.hour)/100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(event) {
        return event.date
    })
    let amount = dates.reduce((memo, day) => {
        return memo + wagesEarnedOnDate(employee, day)
    }, 0)
    return amount
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((memo, record) => {
        return memo + allWagesFor(record)
    }, 0)
}