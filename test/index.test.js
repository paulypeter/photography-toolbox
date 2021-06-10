let photographyTools = require('../src/index')

test("Returns correct sensor size", () => {
    expect(photographyTools.sensor_sizes["35mm"]).toStrictEqual([24, 36]);
    expect(photographyTools.sensor_sizes["APS-H"]).toStrictEqual([19, 28.7]);
    expect(photographyTools.sensor_sizes["APS-C NPS"]).toStrictEqual([15.7, 23.6]);
    expect(photographyTools.sensor_sizes["APS-C C"]).toStrictEqual([14.8, 22.2]);
    expect(photographyTools.sensor_sizes["APS-C"]).toStrictEqual([15, 22.5]);
    expect(photographyTools.sensor_sizes["4/3"]).toStrictEqual([13.5, 18]);
    expect(photographyTools.sensor_sizes['1"']).toStrictEqual([8.8, 13.2]);
});

// crop factor
test("Returns correct crop factor", () => {
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["35mm"]
        )
    ).toBe(1);
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["APS-H"]
        )
    ).toBe(1.3);
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["APS-C C"]
        )
    ).toBe(1.6);
});

test("Returns correct CoC", () => {
    expect(
        photographyTools.coc(
            photographyTools.sensor_sizes["35mm"]
        )
    ).toBe(0.029);
    expect(
        photographyTools.coc(
            photographyTools.sensor_sizes["APS-H"]
        )
    ).toBe(0.023);
    expect(
        photographyTools.coc(
            photographyTools.sensor_sizes["APS-C C"]
        )
    ).toBe(0.018);
});

test("Returns correct normal focal length", () => {
    expect(
        photographyTools.normal_focal_length(
            photographyTools.sensor_sizes["35mm"]
        )
    ).toBe(43);
    expect(
        photographyTools.normal_focal_length(
            photographyTools.sensor_sizes["APS-H"]
        )
    ).toBe(34);
    expect(
        photographyTools.normal_focal_length(
            photographyTools.sensor_sizes["APS-C C"]
        )
    ).toBe(27);
});

// exposure
test("Returns correct stop distance", () => {
    expect(
        photographyTools.number_of_third_steps(
            photographyTools.ISO_SPEEDS, "100", "400"
        )
    ).toBe(6);
    expect(
        photographyTools.number_of_third_steps(
            photographyTools.ISO_SPEEDS, "800", "250"
        )
    ).toBe(-5);
    expect(
        photographyTools.number_of_third_steps(
            photographyTools.SHUTTER_SPEEDS, "1/1000", "1/500"
        )
    ).toBe(3);
    expect(
        photographyTools.number_of_third_steps(
            photographyTools.SHUTTER_SPEEDS, "1.3", "1/10"
        )
    ).toBe(-11);
    expect(
        photographyTools.number_of_third_steps(
            photographyTools.F_STOPS, "20", "9"
        )
    ).toBe(7);
    expect(
        photographyTools.number_of_third_steps(
            photographyTools.F_STOPS, "1.2", "2.5"
        )
    ).toBe(-6);
});

test("Returns correct float for speed str", () => {
    expect(
        photographyTools.get_float_from_speed_str(
            "1/200"
        )
    ).toBe(0.005);
    expect(
        photographyTools.get_float_from_speed_str(
            "1.4"
        )
    ).toBe(1.4);
    expect(
        photographyTools.get_float_from_speed_str(
            "1/8"
        )
    ).toBe(0.125);
    expect(
        photographyTools.get_float_from_speed_str(
            "10"
        )
    ).toBe(10);
});

test("Returns correct closest speed setting", () => {
    expect(
        photographyTools.find_nearest(
            photographyTools.SHUTTER_SPEEDS, 35
        )
    ).toBe("30");
    expect(
        photographyTools.find_nearest(
            photographyTools.SHUTTER_SPEEDS, 0.005
        )
    ).toBe("1/200");
    expect(
        photographyTools.find_nearest(
            photographyTools.SHUTTER_SPEEDS, 0.008
        )
    ).toBe("1/125");
    expect(
        photographyTools.find_nearest(
            photographyTools.SHUTTER_SPEEDS, 1.2
        )
    ).toBe("1.3");
});

// flash
test("Returns correct maximum flash distance", () => {
    expect(
        photographyTools.flash_max_distance(
            43, 10
        )
    ).toBe(4.3);
    expect(
        photographyTools.flash_max_distance(
            47, 2
        )
    ).toBe(23.5);
    expect(
        photographyTools.flash_max_distance(
            60, 4
        )
    ).toBe(15);
});

test("Returns correct minimum aperture for flash", () => {
    expect(
        photographyTools.flash_f_stop(
            43, 10
        )
    ).toBe("4.5");
    expect(
        photographyTools.flash_f_stop(
            47, 5
        )
    ).toBe("9");
    expect(
        photographyTools.flash_f_stop(
            60, 10
        )
    ).toBe("6.3");
});

test("Returns correct minimum flash guide number", () => {
    expect(
        photographyTools.guide_number(
            10, 4.3
        )
    ).toBe(43);
    expect(
        photographyTools.guide_number(
            7.5, 5.0
        )
    ).toBe(38);
    expect(
        photographyTools.guide_number(
            6, 1.4
        )
    ).toBe(8);
});