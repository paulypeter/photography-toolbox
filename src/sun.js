// methods for calculation of sunrise, sunset
// https://gml.noaa.gov/grad/solcalc/solareqns.PDF

// https://stackoverflow.com/a/8619946
day_of_year = date => {
    let year = date.getFullYear()
    let start = new Date(year, 0, 0);
    let diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day_of_year = Math.ceil(diff / oneDay);
    return day_of_year
}

solar_mean_anomaly = date => {
    return 0 - 3.18 + 0.98560 * day_of_year(date)
}

eq_center = anomaly => {
    let m = deg_to_rad(anomaly)
    return (
        1.9148 * Math.sin(m) + 0.02 * Math.sin(2 * m) + 0.0003 * Math.sin(3 * m)
    )
}

is_leap_year = year => {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
}

ecliptic_long = (mean_anomaly, eq_center) => {
    return (
        (mean_anomaly + eq_center + 180 + 102.9372) % 360
    )
}

// gamma
fract_year = (date) => {
    let year = date.getFullYear()
    let hour = date.getHours()
    let length = 365 + (is_leap_year(year) ? 1 : 0)
    let day_in_year = day_of_year(date)
    return (
        (2 * Math.PI / length) *
        (day_in_year - 1 + (hour - 12) / 24)
    )
}

eqtime = gamma => {
    return (
        229.18 * (
            0.000075 + 0.001868 * Math.cos(gamma) -
            0.032077 * Math.sin(gamma) - 
            0.014615 * Math.cos(2 * gamma) -
            0.040849 * Math.sin(2 * gamma)
        )
    )
}

solar_declination = gamma => {
    return (
        0.006918 - 0.399912 * Math.cos(gamma) +
        0.070257 * Math.sin(gamma) -
        0.006758 * Math.cos(2 * gamma) +
        0.000907 * Math.sin(2 * gamma) -
        0.002697 * Math.cos(3 * gamma) +
        0.00148 * Math.sin(3 * gamma)
    )
}

/*
 *  long in degrees
 *  tz: hours from UTC, e. g. -5, +1, ...
 */
offset = (eqtime, long, tz) => {
    return eqtime + 4 * long - 60 * tz
}

tst = (hr, mn, sc, time_offset) => {
    return hr * 60 + mn + sc / 60 + time_offset
}

// TODO: decl in rad or ° ?
hour_angle = (decl, lat) => {
    return (
        rad_to_deg(
            Math.acos(
                (Math.sin(deg_to_rad(-0.833)) - Math.sin(deg_to_rad(lat) * Math.sin(decl))) / 
                (Math.cos(deg_to_rad(lat) * Math.cos(decl)))
            )
        )
    )
}

// hour_angle = tst => {
//     return (tst / 4) - 180
// }

// zenith_angle = (ha, lat, decl) => {
//     return (
//         Math.acos(
//             Math.sin(lat) * Math.sin(decl) +
//             Math.cos(lat) * Math.cos(decl) * Math.cos(ha)
//         )
//     )
// }

// solar_azimuth = (zen_ang, lat, decl) => {
//     return (
//         180 - Math.acos(
//             -1 * (
//                 (
//                     Math.sin(deg_to_rad(lat)) * Math.cos(zen_ang) - 
//                     Math.sin(decl)
//                 ) / Math.cos(deg_to_rad(lat)) * Math.sin(zen_ang)
//             )
//         )
//     )
// }

set_rise_ha = (lat, decl) => {
    return rad_to_deg(
        Math.acos(
            Math.cos(deg_to_rad(90.8333)) /
            Math.cos(deg_to_rad(lat)) * Math.cos(decl) -
            Math.tan(deg_to_rad(lat)) * Math.tan(decl)
        )
    )
}

sunrise_time = (long, eqtime, ha) => {
    return (
        720 - 4 * (long + ha) - eqtime
    )
}

sunset_time = (long, eqtime, ha) => {
    return (
        720 - 4 * (long - ha) - eqtime
    )
}

// solar_noon = (long, eqtime) => {
//     return 720 - 4 * long - eqtime
// }

sunevent_for_location = (lat, long, date, tz, event) => {
    gamma = fract_year(date)
    eq_time = eqtime(gamma)
    decl = solar_declination(gamma)
    set_rise_diff = set_rise_ha(lat, decl)
    if (event == "rise") {
        event_time = sunrise_time(long, eq_time, set_rise_diff) + tz * 60
    } else {
        event_time = sunset_time(long, eq_time, set_rise_diff) + tz * 60
    }
    return get_time_str(event_time)
}

get_time_str = hrs => {
    hr = Math.floor(hrs / 60)
    min = Math.floor((hrs / 60 - hr) * 60)
    min = (min < 10) ? "0" + String(min) : String(min)
    return (String(hr) + ":" + min)
}

deg_to_rad = angle => {
    return angle / 180 * Math.PI
}

rad_to_deg = angle => {
    return angle * 180 / Math.PI
}
