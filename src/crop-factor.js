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
equiv_focal_length = (focal_length, crop_factor) =>  Math.round(focal_length * crop_factor)

normal_focal_length = sensor_size => Math.round(diagonal(sensor_size))

hyperfocal = (focal_length, f_stop, sensor_size) => (focal_length ** 2) / f_stop / coc(sensor_size)

crop_factor = sensor_size => Number((diagonal([24, 36]) / diagonal(sensor_size)).toFixed(1))

diagonal = sensor_size => Math.sqrt(sensor_size[0] ** 2 + sensor_size[1] ** 2)

coc = sensor_size => Number((diagonal(sensor_size) / 1500).toFixed(3))

dof = (sensor_size, distance, f_stop, focal_length) => {
	return (
		Number(
			(dof_far(sensor_size, distance, focal_length, f_stop) -
				dof_near(sensor_size, distance, focal_length, f_stop)
			).toFixed(2)
		)
	)
}

dof_near = (sensor_size, distance, focal_length, f_stop) => {
	hyperfocal_dist = hyperfocal(focal_length, f_stop, sensor_size)
	return Number(
		(hyperfocal_dist * distance /
			(hyperfocal_dist + distance - focal_length) / 1000
		).toFixed(2)
	)
}

dof_far = (sensor_size, distance, focal_length, f_stop) => {
	hyperfocal_dist = hyperfocal(focal_length, f_stop, sensor_size)
	return (
		(hyperfocal_dist * distance /
			(hyperfocal_dist - distance + focal_length) / 1000
		).toFixed(2)
	)

}

// angle of view for a given sensor dimension
aov_dim = (dimension, focal_length) => Math.round(2 * Math.atan(dimension / (2 * focal_length)) * 180 / Math.PI)

aov = (sensor_size, focal_length) => {
	return [
		aov_dim(sensor_size[0], focal_length),
		aov_dim(sensor_size[1], focal_length),
		aov_dim(diagonal(sensor_size), focal_length),
	]
}

coc_custom = (viewing_dist, lpmm, enlargement) => (viewing_dist / 25) / (lpmm * enlargement)
