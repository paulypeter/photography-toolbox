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

// return Math.round(f * cf)
equiv_focal_length = (focal_length, cf) =>  focal_length * cf

normal_focal_length = sensor_size => Math.round(diagonal(sensor_size))

hyperfocal = (focal_length, f_stop, sensor_size) => (focal_length ** 2) / f_stop / coc(sensor_size)

crop_factor = (sensor_size) => diagonal([24, 36]) / diagonal(sensor_size)

diagonal = sensor_size => Math.sqrt(sensor_size[0] ** 2 + sensor_size[1] ** 2)

coc = sensor_size => Number((diagonal(sensor_size) / 1500).toFixed(3))

dof = (sensor_size, distance, f_stop, focal_length) => {
	return 2 * (distance ** 2) * f_stop * coc(sensor_size) / (focal_length ** 2)
}