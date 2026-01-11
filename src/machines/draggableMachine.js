import { createMachine } from "@xstate/fsm";

const dragDropMachineCreator = (options) =>
  createMachine(
    {
      initial: "idle",
      context: {},
      states: {
        idle: {
          on: {
            // touchdown and mousedown is handled by a proxy function
            mousedown: {
              actions: "assignPoint",
              target: "dragging",
            },
          },
        },
        dragging: {
          on: {
            mousemove: {
              actions: "assignDelta",
            },
            touchmove: {
              actions: "assignDelta",
            },
            mouseup: {
              target: "idle",
            },
            touchend: {
              target: "idle",
            },
            "keyup.escape": {
              target: "idle",
              actions: "resetPosition",
            },
          },
        },
      },
    },
    options
  );
export default dragDropMachineCreator;
