// defines methods for flash photography
const EXPOSURE = require('./exposure')

guide_number = (distance, f_stop) => Math.round(distance * f_stop)

flash_max_distance = (guide_number, f_stop) => Number((guide_number / f_stop).toFixed(2))

flash_f_stop = (guide_number, distance) => find_nearest(F_STOPS, guide_number / distance)