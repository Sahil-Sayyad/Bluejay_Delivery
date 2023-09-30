const fs = require('fs');
function checkConsecutiveDays(daysWorked) {
    return /1111111/.test(daysWorked);
}

function checkShiftGap(shiftStartTimes) {
    for (let i = 0; i < shiftStartTimes.length - 1; i++) {
        const timeDiff = (shiftStartTimes[i + 1] - shiftStartTimes[i]) / 3600000; // in hours
        if (timeDiff > 1 && timeDiff < 10) {
            return true;
        }
    }
    return false;
}

function checkLongShift(shiftHours) {
    for (const hours of shiftHours) {
        if (hours > 14) {
            return true;
        }
    }
    return false;
}

function processEmployeeRecords(file_path) {
    const fileContents = fs.readFileSync(file_path, 'utf8');
    // console.log(fileContents);
    const records = fileContents.split('\n');
    // console.log(records);
    for (const record of records) {
        const [name, position, daysWorked, shiftStartTimesStr, shiftHoursStr] = record.split(',');
        const daysWorkedArray = daysWorked.split('');
        const shiftStartTimes = shiftStartTimesStr.split(',').map(Number);
        const shiftHours = shiftHoursStr.split(',').map(Number);
        // console.log(`Processing record: ${name}, ${position}, ${daysWorked}, ${shiftStartTimesStr}, ${shiftHoursStr}`);
        if (checkConsecutiveDays(daysWorkedArray)) {
            console.log(`${name} (${position}) worked for 7 consecutive days.`);
        }
        if (checkShiftGap(shiftStartTimes)) {
            console.log(`${name} (${position}) had less than 10 hours between shifts.`);
        }
        if (checkLongShift(shiftHours)) {
            console.log(`${name} (${position}) worked for more than 14 hours in a single shift.`);
        }
    }
}

const file_path = './employee_records.csv'; // Replace with your file path
processEmployeeRecords(file_path);
