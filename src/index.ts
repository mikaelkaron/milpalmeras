import { Machine, interpret } from "xstate";
import { inspect } from "@xstate/inspect";
import "./styles.css";

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

document.getElementById("app").innerHTML = `
<section>
  <h1>XState TypeScript Example</h1>
  <div>
    Open the <strong>Console</strong> to view the machine output.
  </div>
</section>
`;

interface ToggleContext {}

// Edit your machine(s) here
const machine = Machine<ToggleContext>({
  id: "machine",
  initial: "guide",
  context: {},
  states: {
    guide: {
      initial: "map",
      states: {
        map: {},
        locations: {
          initial: "list",
          states: {
            list: {},
            location: {}
          }
        },
        services: {
          initial: "list",
          states: {
            list: {},
            service: {}
          }
        },
        activities: {
          initial: "list",
          states: {
            list: {
              initial: "popular",
              states: {
                popular: {},
                calendar: {}
              }
            },
            activity: {}
          }
        }
      }
    },
    rentals: {},
    properties: {}
  },
  on: {
    GUIDE: "guide",
    RENTALS: "rentals",
    PROPERTIES: "properties",
    LOCATIONS: "guide.locations",
    LOCATION: "guide.locations.location",
    SERVICES: "guide.services",
    SERVICE: "guide.services.service",
    ACTIVITIES: "guide.activities",
    ACTIVITY: "guide.activities.activity",
    POPULAR: "guide.activities.list.popular",
    CALENDAR: "guide.activities.list.calendar"
  }
});

// Edit your service(s) here
const service = interpret(machine, { devTools: true }).onTransition((state) => {
  console.log(state.value);
});

service.start();
