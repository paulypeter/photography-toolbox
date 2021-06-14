let photographyTools = require('../src/index')

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

test("Returns correct string for speed float", () => {
    expect(
        photographyTools.get_str_from_speed_float(
            0.005
        )
    ).toBe("1/200");
    expect(
        photographyTools.get_str_from_speed_float(
            0.3
        )
    ).toBe("0.3");
    expect(
        photographyTools.get_str_from_speed_float(
            0.125
        )
    ).toBe("1/8");
    expect(
        photographyTools.get_str_from_speed_float(
            10
        )
    ).toBe("10");
});

test("Returns correct closest speed setting", () => {
    expect(
        photographyTools.find_nearest(
            photographyTools.SHUTTER_SPEEDS, 35
        )
    ).toBe("30");
    expect(
        photographyTools.find_nearest(
            photographyTools.SHUTTER_SPEEDS, 60.12312
        )
    ).toBe(60);
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

test("Returns correct exposure value", () => {
    expect(
        Math.round(photographyTools.exposure_value(
            4, 1/200
        ))
    ).toBe(12);
    expect(
        Math.round(photographyTools.exposure_value(
            2.8, 15, 400
        ))
    ).toBe(-3);
    expect(
        Math.round(photographyTools.exposure_value(
            8, 1 / 60, 1600
        ))
    ).toBe(8);
    expect(
        Math.round(photographyTools.exposure_value(
            1.0, 2, 50
        ))
    ).toBe(0);
});

test("Returns correct shutter speed", () => {
    expect(
        photographyTools.shutter_for_ev(
            0, 1
        )
    ).toBe("1");
    expect(
        photographyTools.shutter_for_ev(
            -3, 2
        )
    ).toBe("30");
    expect(
        photographyTools.shutter_for_ev(
            10, 5.6, 200
        )
    ).toBe("1/60");
    expect(
        photographyTools.shutter_for_ev(
            11, 4.5, 400
        )
    ).toBe("1/400");
    expect(
        photographyTools.shutter_for_ev(
            10, 4.5, 250
        )
    ).toBe("1/125");
});

test("Returns correct f-stop", () => {
    expect(
        photographyTools.f_stop_for_ev(
            0, 1
        )
    ).toBe("1.0");
    expect(
        photographyTools.f_stop_for_ev(
            -3, 30
        )
    ).toBe("2.0");
    expect(
        photographyTools.f_stop_for_ev(
            10, 1 / 60, 200
        )
    ).toBe("5.6");
    expect(
        photographyTools.f_stop_for_ev(
            11, 1 / 400, 400
        )
    ).toBe("4.5");
    expect(
        photographyTools.f_stop_for_ev(
            10, 1 / 125, 250
        )
    ).toBe("4.5");
});