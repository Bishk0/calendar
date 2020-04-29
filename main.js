let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const calendar = document.querySelector(".calendar__body");
const table = document.createElement("table");
calendar.append(table);
let monthAndYear = document.querySelector(".monthAndYear");

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const daysUa = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const monthsUa = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

showCalendar(currentMonth, currentYear);

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay() - 1;
  if (firstDay === -1) {
    firstDay = 6;
  }

  let endPrevMonth = new Date(year, month, 0).getDate() + 1 - firstDay;

  table.innerHTML = "";

  for (let i = 0; i < 1; i++) {
    //create 'th' elem and display days of week
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      cell = document.createElement("th");
      if (i === 0) {
        cell.innerHTML = daysUa[j];
        row.appendChild(cell);
      }
    }
    table.appendChild(row);
  }

  monthAndYear.innerHTML = monthsUa[month] + " " + year;
  // selectYear.value = year;
  // selectMonth.value = month;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        row.append(cell);
        cellText = document.createTextNode(endPrevMonth++);
        cell.append(cellText);
        cell.classList.add("text-muted"); // styling days prev month
      } else {
        cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-success");
        }
        cell.append(cellText);
        row.append(cell);
        
        date++;
      }
     
      let startNextMonth = new Date(year, month + 2, 1).getDate();
      cellText = document.createTextNode(startNextMonth);
    
      if (date > new Date(year, month + 1, 0).getDate()) {
        date = 1;

      } 

      if(i > 2 && date > 1 && date < 16) {
        cell.classList.add("text-muted"); // styling days next month
      }
    
    }

    table.append(row);
  }
}