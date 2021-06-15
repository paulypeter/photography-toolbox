// defines methods for flash photography
const EXPOSURE = require('./exposure')

guide_number = (distance, f_stop, iso_speed = 100) => {
    return Math.round(distance * f_stop / Math.sqrt(iso_speed / 100))
}

flash_max_distance = (guide_number, f_stop, iso_speed = 100) => {
    return Number(
        (guide_number / f_stop * Math.sqrt(iso_speed / 100)).toFixed(2)
    )
}

flash_f_stop = (guide_number, distance, iso_speed = 100) => {
    return find_nearest(F_STOPS, guide_number / distance * Math.sqrt(iso_speed / 100))
}