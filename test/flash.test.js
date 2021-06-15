let photographyTools = require('../src/index')

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
    expect(
        photographyTools.flash_max_distance(
            60, 4, 400
        )
    ).toBe(30);
    expect(
        photographyTools.flash_max_distance(
            56, 5.6, 200
        )
    ).toBe(14.14);
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
    expect(
        photographyTools.flash_f_stop(
            60, 15, 200
        )
    ).toBe("5.6");
    expect(
        photographyTools.flash_f_stop(
            43, 10, 400
        )
    ).toBe("9");
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
    expect(
        photographyTools.guide_number(
            10, 1.4, 200
        )
    ).toBe(10);
    expect(
        photographyTools.guide_number(
            10, 8, 400
        )
    ).toBe(40);
});