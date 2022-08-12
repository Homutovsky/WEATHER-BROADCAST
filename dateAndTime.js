import { clock, dateToday, dayWeek } from './nodes.js';


export function clockTimer() {
    const date = new Date();
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()];

    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOfyear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = date.getDay();
    const month = date.getMonth();
    const dayOfmonth = date.getDate();

    if (time[0] < 10) { time[0] = "0" + time[0]; }
    if (time[1] < 10) { time[1] = "0" + time[1]; }
    if (time[2] < 10) { time[2] = "0" + time[2]; }

    let currentTime = [time[0], time[1], time[2]].join(':');
    clock.textContent = currentTime;


    dateToday.textContent = [dayOfmonth, monthOfyear[month]].join(' ');
    dayWeek.textContent = [dayOfWeek[days]].join('');

    setTimeout(clockTimer, 1000);
}