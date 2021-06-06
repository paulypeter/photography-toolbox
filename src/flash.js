// defines methods for flash photography

guide_number = (distance, aperture) => distance * aperture

flash_max_distance = (guide_number, aperture) => guide_number / aperture

flash_aperture = (guide_number, distance) => guide_number / distance