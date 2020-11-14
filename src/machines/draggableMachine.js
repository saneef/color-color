import { createMachine } from "@xstate/fsm";

const dragDropMachineCreator = (options) =>
  createMachine(
    {
      initial: "idle",
      context: {},
      states: {
        idle: {
          on: {
            mousedown: {
              actions: "assignPoint",
              target: "dragging",
            },
          },
        },
        dragging: {
          // after: {
          //   TIMEOUT: {
          //     target: "idle",
          //     actions: "resetPosition",
          //   },
          // },
          on: {
            mousemove: {
              actions: "assignDelta",
              internal: false,
            },
            mouseup: {
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
