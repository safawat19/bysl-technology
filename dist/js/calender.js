var back = document.querySelector("#back");
var forwd = document.querySelector("#forwd");
var year = document.querySelector("#year");
var day = document.querySelector("#day");
var days = document.querySelector(".dates");
var main = document.querySelector("#main");
const week_day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
//Days count for Months January to December
const day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//Days count for Months January to December(Leap year)
const day_count_lp_year = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//Functions
//Function to create all the dates of a month
var make_days = (days, dt_obj) =>{
    for(let i = 1; i <= days; i++){
        var date = document.createElement("div");
        date.innerText = i;
        if (dt_obj.getDate() == i && dt_obj.getMonth() == new Date().getMonth()  && dt_obj.getFullYear() == new Date().getFullYear()){
            date.classList.add("active");
        }
        main.appendChild(date);
    }
}
//Function to make days of a week
var make_week = first_day => {
    days.innerHTML = "";
    for(let i = 0; i <= 6; i++){
        var wk_day = document.createElement("div");
        wk_day.innerText = week_day[first_day];
        days.appendChild(wk_day);
        if (first_day < 6){
            first_day++;
        } else{
            first_day = 0;
        }
    }
}
//Function to check a year is leap year or not
var is_leap_year = y =>{
    if (y % 4 == 0) {
        if (y % 100 == 0) {
            if (y % 400 == 0){
                return true;
            } else{
                return false;
            }   
        } else{
            return true;
        }
    } else{
        return false;
    }
}
//Function to show current date
var show_cur_date = dt_obj => {
    year.innerText = month[dt_obj.getMonth()] + ", " + dt_obj.getFullYear();
    day.innerText = week_day[dt_obj.getDay()];
    var leap_year = is_leap_year(dt_obj.getFullYear());
    if(leap_year){
        make_days(day_count_lp_year[dt_obj.getMonth()], dt_obj);
    } else{
        make_days(day_count[dt_obj.getMonth()], dt_obj)
    }
    make_week(new Date(dt_obj.getFullYear(), dt_obj.getMonth(), 1).getDay());
}
//Function to next month / Previous month (calendar javascript)
var next_month = (next = true) =>{
    if(next){
        main.innerHTML = "";
        if (dt.getMonth() < 11) {
            dt.setMonth(dt.getMonth() + 1);
        } else {
            dt.setMonth(0);
            dt.setFullYear(dt.getFullYear() + 1);
        }
        show_cur_date(dt);
    } else{
        main.innerHTML = "";
        if (dt.getMonth() > 0) {
            dt.setMonth(dt.getMonth() - 1);
        } else {
            dt.setMonth(11);
            dt.setFullYear(dt.getFullYear() - 1);
        }
        show_cur_date(dt);
    }
}

//Operations (On screen controls)[js calendar]
//Current date
var dt = new Date();
show_cur_date(dt);
//Forward button click
forwd.onclick = () => {
    next_month();
}
//Back button click
back.onclick = () =>{
    next_month(false);
}
//Operations (Keyboard Controls)
document.onkeyup = e =>{
    if (e.key == "ArrowRight"){
        next_month();
    } else if (e.key == "ArrowLeft"){
        next_month(false);
    }
}