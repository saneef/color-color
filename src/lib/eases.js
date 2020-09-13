// Values are function names from "svelte/easing"
export const eases = [
  {
    title: "Linear",
    eases: [
      {
        title: "Linear",
        value: ".25,.25,.75,.75",
        alias: "linear",
      },
    ],
  },
  {
    title: "Sine",
    eases: [
      {
        title: "Ease in sine",
        value: ".12,0,.39,0",
        alias: "sineIn",
      },
      {
        title: "Ease in-out sine",
        value: ".37,0,.63,1",
        alias: "sineInOut",
      },
      {
        title: "Ease out sine",
        value: ".61,1,.88,1",
        alias: "sineOut",
      },
    ],
  },
  {
    title: "Quadratic",
    eases: [
      {
        title: "Ease in quad",
        value: ".11,0,.5,0",
        alias: "quadIn",
      },
      {
        title: "Ease in-out quad",
        value: ".45,0,.55,1",
        alias: "quadInOut",
      },
      {
        title: "Ease out quad",
        value: ".5,1,.89,1",
        alias: "quadOut",
      },
    ],
  },
  {
    title: "Cubic",
    eases: [
      {
        title: "Ease in cubic",
        value: ".32,0,.67,0",
        alias: "cubicIn",
      },
      {
        title: "Ease in-out cubic",
        value: ".65,0,.35,1",
        alias: "cubicInOut",
      },
      {
        title: "Ease out cubic",
        value: ".33,1,.68,1",
        alias: "cubicOut",
      },
    ],
  },
  {
    title: "Quartic",
    eases: [
      {
        title: "Ease in quart",
        value: ".5,0,.75,0",
        alias: "quartIn",
      },
      {
        title: "Ease in-out quart",
        value: ".76,0,.24,1",
        alias: "quartInOut",
      },
      {
        title: "Ease out quart",
        value: ".25,1,.5,1",
        alias: "quartOut",
      },
    ],
  },
  {
    title: "Quintic",
    eases: [
      {
        title: "Ease in quint",
        value: ".64,0,.78,0",
        alias: "quintIn",
      },
      {
        title: "Ease in-out quint",
        value: ".83,0,.17,1",
        alias: "quintInOut",
      },
      {
        title: "Ease out quint",
        value: ".22,1,.36,1",
        alias: "quintOut",
      },
    ],
  },
  {
    title: "Exponential",
    eases: [
      {
        title: "Ease in expo",
        value: ".7,0,.84,0",
        alias: "expoIn",
      },
      {
        title: "Ease in-out expo",
        value: ".87,0,.13,1",
        alias: "expoInOut",
      },
      {
        title: "Ease out expo",
        value: ".16,1,.3,1",
        alias: "expoOut",
      },
    ],
  },
  {
    title: "Circular",
    eases: [
      {
        title: "Ease in circ",
        value: ".55,0,1,.45",
        alias: "circIn",
      },
      {
        title: "Ease in-out circ",
        value: ".85,0,.15,1",
        alias: "circInOut",
      },
      {
        title: "Ease out circ",
        value: "0,.55,.45,1",
        alias: "circOut",
      },
    ],
  },
];

export const getBezierEasingByAlias = (alias) => {
  const ungroupedEases = eases.reduce((acc, cur) => [...acc, ...cur.eases], []);

  const ease = ungroupedEases.find((e) => e.alias === alias);

  return ease && ease.value;
};

export const getAliasByBezierEasing = (value) => {
  const ungroupedEases = eases.reduce((acc, cur) => [...acc, ...cur.eases], []);

  const ease = ungroupedEases.find((e) => e.value === value);

  return ease && ease.alias;
};

export const stringToCubicBezierParams = (str) => {
  const params = str.split(",");
  const numericParams = params.map((p) => +p.trim()).filter((n) => !isNaN(n));

  if (numericParams.length === 4) {
    return numericParams;
  }
};

const numberToString = (n) => {
  let str = Number.isInteger(n) ? n.toString() : n.toFixed(2);
  if (str.indexOf("0") === 0) {
    str = str.slice(1);
  }

  if (str[str.length - 1] === "0") {
    str = str.slice(0, -1);
  }

  return str;
};

export const cubicBezierParamsToString = (params) => {
  const cleanedParams = params.filter((p) => !isNaN(p));

  if (cleanedParams.length === 4) {
    return cleanedParams.map(numberToString).join(",");
  }
};
