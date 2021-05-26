import test from "ava";
import {
  getBezierEasingByAlias,
  getAliasByBezierEasing,
  stringToCubicBezierParams,
  cubicBezierParamsToString,
} from "./eases.js";

test("getBezierEasingByAlias: should get cubic bezier value for 'circInOut'", (t) => {
  t.truthy(getBezierEasingByAlias("circInOut") === ".85,0,.15,1");
});

test("getBezierEasingByAlias: should not get cubic bezier value for 'blah'", (t) => {
  t.truthy(getBezierEasingByAlias("blah") === undefined);
});

test("getAliasByBezierEasing: should get cubic bezier alias for '.85,0,.15,1'", (t) => {
  t.truthy(getAliasByBezierEasing(".85,0,.15,1") === "circInOut");
});

test("getAliasByBezierEasing: should get cubic bezier alias for '.85,0,.15,1.5'", (t) => {
  t.truthy(getAliasByBezierEasing(".85,0,.15,1.5") === undefined);
});

test("should parse", (t) => {
  t.deepEqual(stringToCubicBezierParams(".2,.2,.2,.2"), [0.2, 0.2, 0.2, 0.2]);
});

test("stringToCubicBezierParams: should not parse", (t) => {
  t.truthy(stringToCubicBezierParams(".2,.2,.2") === undefined);
});

test("stringToCubicBezierParams: should not parse this too", (t) => {
  t.truthy(stringToCubicBezierParams(".2,.2,.2,a") === undefined);
});

test("cubicBezierParamsToString: should encode", (t) => {
  t.truthy(cubicBezierParamsToString([1, 0.2, 0.33, 0.2]) === "1,.2,.33,.2");
});

test("cubicBezierParamsToString: should not encode", (t) => {
  t.truthy(cubicBezierParamsToString([0.2, 0.2, 0.2]) === undefined);
});

test("cubicBezierParamsToString: should not encode this too", (t) => {
  t.truthy(cubicBezierParamsToString([0.2, 0.2, 0.2, "a"]) === undefined);
});
