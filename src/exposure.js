// methods concerning exposure conversions

ISO_SPEEDS = [
    "25", "32", "40", "50", "64", "80", "100", "125", "160", "200", "250", "320",
    "400", "500", "640", "800", "1000", "1250", "1600", "2000", "2500", "3200",
    "4000", "5000", "6400", "8000", "10000", "12500", "16000", "20000", "25000", "32000",
    "40000", "50000", "64000", "80000", "100000", "125000", "160000", "200000"
]

SHUTTER_SPEEDS = [
    "1/8000", "1/6400", "1/5000", "1/4000", "1/3200", "1/2500", "1/2000",
    "1/1600", "1/1250", "1/1000", "1/800", "1/640", "1/500", "1/400", "1/320",
    "1/250", "1/200", "1/160", "1/125", "1/100", "1/80", "1/60", "1/50", "1/40",
    "1/30", "1/25", "1/20", "1/15", "1/13", "1/10", "1/8", "1/6", "1/5", "1/4",
    "0.3", "0.4", "0.5", "0.6", "0.8", "1", "1.3", "1.6", "2", "2.5", "3.2",
    "4", "5", "6", "8", "10", "13", "15", "20", "25", "30"
]

F_STOPS = [
    "91", "81", "72", "64", "57", "51", "45", "40", "36", "32", "29",
    "25", "22", "20", "18", "16", "14", "13", "11", "10", "9", "8",
    "7.1", "6.3", "5.6", "5.0", "4.5", "4.0", "3.5", "3.2", "2.8",
    "2.5", "2.2", "2.0", "1.8", "1.6", "1.4", "1.2", "1.1", "1.0"
]

number_of_third_steps = (array, val1, val2) => array.indexOf(val2) - array.indexOf(val1)

get_float_from_speed_str = str => {
    if (str.indexOf("/") !== -1) {
        let nums = str.split('/')
        res = parseInt(nums[0]) / parseInt(nums[1])
    } else {
        res = parseFloat(str)
    }
    return res
}

get_str_from_speed_float = value => {
    if (value <= 0.25) {
        return "1/" + (1 / value).toString()
    }
    return value.toString()
}

exposure_value = (f_stop, shutter_speed, iso_speed = 100) => {
    ev_s = Math.log2((f_stop ** 2) / shutter_speed)
    if (iso_speed !== 100) {
        ev_s -=  Math.log2(iso_speed / 100)
    }
    return ev_s
}

shutter_for_ev = (ev, f_stop, iso_speed = 100) => {
    shutter = 2 ** (Math.log2(f_stop ** 2) - ev - Math.log2(iso_speed / 100))
    return find_nearest(SHUTTER_SPEEDS, shutter)
}

f_stop_for_ev = (ev, shutter_speed, iso_speed = 100) => {
    f_stop = Math.sqrt(2 ** (Math.log2(shutter_speed) + ev + Math.log2(iso_speed / 100)))
    return find_nearest(F_STOPS, f_stop)
}

iso_speed_for_ev = (ev, shutter_speed, f_stop) => {
    iso_speed = 2 ** (Math.log2(100 * (f_stop ** 2) / shutter_speed) - ev)
    return find_nearest(ISO_SPEEDS, iso_speed)
}

find_nearest = (setting, value) => {
    if (setting.includes("1/8000") && value > 35) {
        return Math.round(value)
    }
    if (setting.indexOf(get_str_from_speed_float(value)) > -1) {
        return get_str_from_speed_float(value)
    }
    closest = (i, j) => {
        diff_i = Math.abs(get_float_from_speed_str(i) - value);
        diff_j = Math.abs(get_float_from_speed_str(j) - value);

        return diff_i < diff_j ? i : j;
    }

    return setting.reduce(closest);
}

/*
 * @param original {"f_stop": f_stop, "shutter": shutter, "iso_speed": iso_speed}
 * @param target {"f_stop": f_stop, "shutter": shutter, "iso_speed": iso_speed} ( two of the three)
 * @param mode "shutter", "f_stop", or "iso_speed" -> the value to be calculated
 *
 */
equivalent_exposure = (original, target, mode) => {
    orig_ev = exposure_value(original.f_stop, original.shutter, original.iso_speed)
    switch (mode) {
        case "shutter":
            return shutter_for_ev(orig_ev, target.f_stop, target.iso_speed)
        case "f_stop":
            return f_stop_for_ev(orig_ev, target.shutter, target.iso_speed)
        case "iso_speed":
            return iso_speed_for_ev(orig_ev, target.shutter, target.f_stop)

    }
}