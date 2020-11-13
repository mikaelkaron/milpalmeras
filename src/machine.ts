import { Machine, MachineConfig, StateSchema } from 'xstate';
export {
  Interpreter as MachineInterpreter,
  State as MachineState,
} from 'xstate';

export interface AppContext {}

export type AppEvent =
  | { type: 'GUIDE' }
  | { type: 'HOUSING' }
  | { type: 'RENTALS' }
  | { type: 'RENTAL' }
  | { type: 'PROPERTIES' }
  | { type: 'PROPERTY' }
  | { type: 'LOCATIONS' }
  | { type: 'LOCATION' }
  | { type: 'ACTIVITIES' }
  | { type: 'ACTIVITY' }
  | { type: 'POPULAR' }
  | { type: 'CALENDAR' }
  | { type: 'SERVICES' }
  | { type: 'SERVICE'; serviceId: String };

export interface AppSchema extends StateSchema<AppContext> {
  states: {
    guide: {
      states: {
        map: {};
        locations: {
          states: {
            list: {};
            location: {};
          };
        };
        activities: {
          states: {
            list: {
              states: {
                popular: {};
                calendar: {};
              };
            };
            activity: {};
          };
        };
      };
    };
    housing: {
      states: {
        rentals: {
          states: {
            list: {};
            rental: {};
          };
        };
        properties: {
          states: {
            list: {};
            property: {};
          };
        };
      };
    };
    services: {
      states: {
        list: {};
        service: {};
      };
    };
  };
}

export const appConfig: MachineConfig<AppContext, AppSchema, AppEvent> = {
  id: 'machine',
  initial: 'guide',
  context: {},
  states: {
    guide: {
      initial: 'map',
      states: {
        map: {},
        locations: {
          initial: 'list',
          states: {
            list: {
              meta: {
                component: 'v4f-screen-locations',
              },
            },
            location: {},
          },
        },
        activities: {
          initial: 'list',
          states: {
            list: {
              initial: 'popular',
              states: {
                popular: {
                  meta: {
                    component: 'v4f-screen-activities',
                  },
                },
                calendar: {},
              },
            },
            activity: {},
          },
        },
      },
    },
    housing: {
      initial: 'rentals',
      states: {
        rentals: {
          initial: 'list',
          states: {
            list: {
              meta: {
                component: 'v4f-screen-rentals',
              },
            },
            rental: {},
          },
        },
        properties: {
          initial: 'list',
          states: {
            list: {},
            property: {},
          },
        },
      },
    },
    services: {
      initial: 'list',
      states: {
        list: {
          meta: {
            component: 'v4f-screen-services',
          },
        },
        service: {
          meta: {
            component: 'v4f-screen-service',
          },
        },
      },
    },
  },
  on: {
    GUIDE: 'guide',
    HOUSING: 'housing',
    RENTALS: 'housing.rentals',
    RENTAL: 'housing.rentals.rental',
    PROPERTIES: 'housing.properties',
    PROPERTY: 'housing.properties.property',
    LOCATIONS: 'guide.locations',
    LOCATION: 'guide.locations.location',
    ACTIVITIES: 'guide.activities',
    ACTIVITY: 'guide.activities.activity',
    POPULAR: 'guide.activities.list.popular',
    CALENDAR: 'guide.activities.list.calendar',
    SERVICES: 'services',
    SERVICE: 'services.service',
  },
  meta: {
    component: 'v4f-screen-home',
  },
};

export const appMachine = Machine<AppContext, AppSchema, AppEvent>(appConfig);
