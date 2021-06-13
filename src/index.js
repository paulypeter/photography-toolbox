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
    dof,
    aov,
    dof_near,
    dof_far,
    // flash
    guide_number,
    flash_max_distance,
    flash_f_stop,
    // exposure
    ISO_SPEEDS,
    SHUTTER_SPEEDS,
    F_STOPS,
    get_float_from_speed_str,
    get_str_from_speed_float,
    number_of_third_steps,
    exposure_value,
    shutter_for_ev,
    f_stop_for_ev,
    find_nearest
}

console.log(crop_factor(sensor_sizes["APS-C C"]))
console.log(exposure_value(8, 1 / 250, 400))