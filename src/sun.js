// methods for calculation of sunrise, sunset

// https://stackoverflow.com/a/8619946
day_of_year = (day, month, year) => {
    let target_day = new Date(year, month - 1, day);
    let start = new Date(year, 0, 0);
    let diff = (target_day - start) + ((start.getTimezoneOffset() - target_day.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day_of_year = Math.floor(diff / oneDay);
    return day_of_year
}

is_leap_year = year => {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
}

fract_year = (day, month, year) => {

}

console.log(day_of_year(15, 6, 2021))