const CROP = require('./crop-factor')

module.exports = {
    sensor_sizes,
    coc,
    diagonal,
    crop_factor,
    hyperfocal,
    equiv_focal_length,
    normal_focal_length
}

console.log(crop_factor(sensor_sizes["APS-C C"]))