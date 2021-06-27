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

test("Returns correct custom CoC", () => {
    expect(
        photographyTools.coc_custom(50, 5, 8)
    ).toBe(0.05);
    expect(
        photographyTools.coc_custom(30, 5, 7)
    ).toBe(0.034);
    expect(
        photographyTools.coc_custom(30, 5, 11)
    ).toBe(0.022);
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

test("Returns correct DoF", () => {
    expect(
        photographyTools.dof(
            20000, 4, 85, 0.018
        )
    ).toBe(8.26);
    expect(
        photographyTools.dof(
            10000, 1.8, 50, 0.029
        )
    ).toBe(4.34);
    expect(
        photographyTools.dof(
            35000, 2.8, 200, 0.029
        )
    ).toBe(4.97);
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

test("Returns correct equivalent focal length", () => {
    expect(
        photographyTools.equiv_focal_length(
            10, 1.6
        )
    ).toBe(16);
    expect(
        photographyTools.equiv_focal_length(
            50, 1.0
        )
    ).toBe(50);
    expect(
        photographyTools.equiv_focal_length(
            50, 1.5
        )
    ).toBe(75);
    expect(
        photographyTools.equiv_focal_length(
            200, 1.3
        )
    ).toBe(260);
});

test("Returns correct angles of view", () => {
    expect(
        photographyTools.aov(
            photographyTools.sensor_sizes["35mm"], 50
        )
    ).toStrictEqual([ 27, 40, 47 ]);
    expect(
        photographyTools.aov(
            photographyTools.sensor_sizes["APS-C C"], 30
        )
    ).toStrictEqual([ 28, 41, 48 ]);
    expect(
        photographyTools.aov(
            photographyTools.sensor_sizes["4/3"], 50
        )
    ).toStrictEqual([ 15, 20, 25 ]);
});