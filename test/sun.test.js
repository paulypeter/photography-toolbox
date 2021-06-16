
let photographyTools = require('../src/index')

hrs_from_str = (time_str) => {
    return parseInt(time_str.slice(0, 2)) + parseInt(time_str.slice(-2)) / 60
}

test("Returns approximate (within 6 min) sunrise for Berlin, Germany", () => {
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2021, month=5, day=21), 2, "rise"
                )
            ) - hrs_from_str("04:44")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2021, month=8, day=5), 2, "rise"
                )
            ) - hrs_from_str("06:25")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2021, month=11, day=24), 1, "rise"
                )
            ) - hrs_from_str("08:16")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2025, month=0, day=1), 1, "rise"
                )
            ) - hrs_from_str("08:17")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
});

test("Returns approximate (within 6 min) sunset for Berlin, Germany", () => {
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2021, month=5, day=21), 2, "set"
                )
            ) - hrs_from_str("21:31")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2021, month=8, day=5), 2, "set"
                )
            ) - hrs_from_str("19:43")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2021, month=11, day=24), 1, "set"
                )
            ) - hrs_from_str("15:55")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
    expect(
        Number(Math.abs(
            hrs_from_str(
                photographyTools.sunevent_for_location(
                    52.52, 13.4, new Date(year=2025, month=0, day=1), 1, "set"
                )
            ) - hrs_from_str("16:02")
        ).toFixed(1))
    ).toBeLessThanOrEqual(0.1);
});