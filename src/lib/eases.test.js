import {
  getBezierEasingByAlias,
  getAliasByBezierEasing,
  stringToCubicBezierParams,
  cubicBezierParamsToString,
} from "./eases.js";

describe("query eases", () => {
  test("should get cubic bezier value for 'circInOut'", () => {
    expect(getBezierEasingByAlias("circInOut")).toBe(".85,0,.15,1");
  });

  test("should not get cubic bezier value for 'blah'", () => {
    expect(getBezierEasingByAlias("blah")).toBeUndefined();
  });

  test("should get cubic bezier alias for '.85,0,.15,1'", () => {
    expect(getAliasByBezierEasing(".85,0,.15,1")).toBe("circInOut");
  });

  test("should get cubic bezier alias for '.85,0,.15,1.5'", () => {
    expect(getAliasByBezierEasing(".85,0,.15,1.5")).toBeUndefined();
  });
});

describe("cubic bezier easing params", () => {
  test("should parse", () => {
    expect(stringToCubicBezierParams(".2,.2,.2,.2")).toStrictEqual([
      0.2,
      0.2,
      0.2,
      0.2,
    ]);
  });

  test("should not parse", () => {
    expect(stringToCubicBezierParams(".2,.2,.2")).toBeUndefined();
  });

  test("should not parse this too", () => {
    expect(stringToCubicBezierParams(".2,.2,.2,a")).toBeUndefined();
  });

  test("should encode", () => {
    expect(cubicBezierParamsToString([1, 0.2, 0.33, 0.2])).toBe("1,.2,.33,.2");
  });

  test("should not encode", () => {
    expect(cubicBezierParamsToString([0.2, 0.2, 0.2])).toBeUndefined();
  });

  test("should not encode this too", () => {
    expect(cubicBezierParamsToString([0.2, 0.2, 0.2, "a"])).toBeUndefined();
  });
});
