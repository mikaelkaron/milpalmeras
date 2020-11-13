import { Component, ComponentInterface, h, State } from '@stencil/core';
import { inspect } from '@xstate/inspect';
import { EventObject, interpret, StateSchema } from 'xstate';
import {
  AppContext,
  AppEvent,
  appMachine,
  AppSchema,
  MachineInterpreter,
  MachineState,
} from '../../machine';

inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});

const getMeta = <
  TContext,
  TEvent extends EventObject,
  TStateSchema extends StateSchema<TContext>
>(
  state: MachineState<TContext, TEvent, TStateSchema>
) => {
  const { meta } = state;
  return Object.assign(
    {},
    meta['machine'],
    ...state.toStrings().map((id) => meta[`machine.${id}`])
  );
};

@Component({
  tag: 'v4f-app',
})
export class App implements ComponentInterface {
  service!: MachineInterpreter<AppContext, AppSchema, AppEvent>;

  @State() state!: MachineState<AppContext, AppEvent, AppSchema>;

  componentWillLoad() {
    const machine = appMachine.withContext({});
    this.state = machine.initialState;
    const service = interpret(machine, {
      devTools: true,
    });
    service.subscribe((state) => {
      this.state = state;
    });
    this.service = service.start();
  }

  disconnectedCallback() {
    this.service.stop();
  }

  public render() {
    const { service, state } = this;
    const { component: Component } = getMeta(this.state);
    return <Component service={service} state={state} />;
  }
}
