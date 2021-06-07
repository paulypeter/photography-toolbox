// defines methods for flash photography

guide_number = (distance, f_stop) => distance * f_stop

flash_max_distance = (guide_number, f_stop) => guide_number / f_stop

flash_f_stop = (guide_number, distance) => guide_number / distance