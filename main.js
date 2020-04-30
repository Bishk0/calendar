let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();

const calendar = document.querySelector(".calendar__body");
const table = document.createElement("table");
calendar.append(table);
const monthAndYear = document.querySelector(".monthAndYear");
const currentDate = document.querySelector(".date");

const daysEng = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const daysUa = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const monthsEng = [
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

const months = [
  "Січня",
  "Лютого",
  "Березня",
  "Квітня",
  "Травня",
  "Червня",
  "Липня",
  "Серпня",
  "Вересня",
  "Жовтня",
  "Листопада",
  "Грудня",
];

function clock() {
  let date = new Date();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  document.querySelector(".time").innerHTML =
    hours + ":" + minutes + ":" + seconds;

  currentDate.innerHTML =
    currentDay + " " + months[currentMonth] + " " + currentYear + " р.";
}
setInterval(clock, 1000);
clock();

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

  monthAndYear.innerHTML = monthsUa[month] + " " + year + " р.";
  // selectYear.value = year;
  // selectMonth.value = month;

  let date = 1;
  let newDate = 1;
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
       
      if (date - 1 > new Date(year, month + 1, 0).getDate()) {
        cell.innerHTML = ""
        cellText = document.createTextNode(newDate++);
        cell.append(cellText);
        cell.classList.add("text-muted"); // styling days next month
      }
      
      // ------------------ Selected element--------------
      let td = document.querySelectorAll("td");
      // cell.addEventListener("click", function () {
      //   // this.classList.toggle("selected");
      //   if(this.classList.contains("selected")){
      //     this.classList.remove("selected");
      //   } else {
      //     this.classList.add("selected");
      //   }
      // });

      
      // for (let i = 0; i < td.length; i++) {
      //   td[i].addEventListener("click", function () {
      //     // this.classList.toggle("selected");
      //     if(td[i].classList.contains("selected")){
      //       td[i].classList.remove("selected");
      //     } else {
      //       this.classList.add("selected");
      //     }
      //   });
      // }
      //-------------------------------------------------
    }

    table.append(row);
  }
}
