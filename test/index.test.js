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

test("Returns correct CoC", () => {
    expect(
        photographyTools.coc(
            photographyTools.sensor_sizes["35mm"]
        )
    ).toBe(0.029);
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["APS-H"]
        )
    ).toBe(0.023);
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["APS-C C"]
        )
    ).toBe(0.018);
});

test("Returns correct normal focal length", () => {
    expect(
        photographyTools.coc(
            photographyTools.sensor_sizes["35mm"]
        )
    ).toBe(43);
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["APS-H"]
        )
    ).toBe(33);
    expect(
        photographyTools.crop_factor(
            photographyTools.sensor_sizes["APS-C C"]
        )
    ).toBe(27);
});