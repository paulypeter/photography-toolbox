const CROP = require('./crop-factor')
const FLASH = require('./flash')

module.exports = {
    sensor_sizes,
    coc,
    diagonal,
    crop_factor,
    hyperfocal,
    equiv_focal_length,
    normal_focal_length,
    guide_number,
    flash_max_distance,
    flash_aperture
}

console.log(crop_factor(sensor_sizes["APS-C C"]))