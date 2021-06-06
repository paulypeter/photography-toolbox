const CROP = require('./crop-factor')
const FLASH = require('./flash')
const EXPOSURE = require('./exposure')

module.exports = {
    // sensor
    sensor_sizes,
    coc,
    diagonal,
    crop_factor,
    hyperfocal,
    equiv_focal_length,
    normal_focal_length,
    // flash
    guide_number,
    flash_max_distance,
    flash_aperture,
    // exposure
    ISO_SPEEDS,
    SHUTTER_SPEEDS,
    APERTURES,
    number_of_third_steps,
    exposure_value
}

console.log(crop_factor(sensor_sizes["APS-C C"]))
console.log(exposure_value(8, 1 / 250, 400))