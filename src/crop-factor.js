// provides methods concerning the crop factor

sensor_sizes = {	// from wikipedia
	"35mm": [24, 36],
	"APS-H": [19, 28.7],
	"APS-C NPS": [15.7, 23.6],
	"APS-C C": [14.8, 22.2],
	"APS-C": [15, 22.5],
	"4/3": [13.5, 18],
	'1"': [8.8, 13.2]
}
exports.equiv_focal_length = function (f, cf) {
// return Math.round(f * cf)
	return f * cf
}

exports.normal_focal_length = function (cf) {
	return 0
}

exports.hyperfocal = function (f, aperture, cropFactor) {
	return f * f / aperture / coc
}

coc = function (diag) {
	return diag / 1730
}
