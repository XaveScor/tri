import {
  MessageBus,
  noParentContextSymbol,
} from '@widgeteria/hierarchy-message-bus';

export class WidgeteriaContext<BaseContext, RouteArgs> {
  readonly #baseContext: BaseContext;
  readonly #routeArgs: RouteArgs;
  readonly #messageBus: MessageBus<WidgeteriaContext<BaseContext, RouteArgs>>;
  readonly #parent:
    | WidgeteriaContext<BaseContext, RouteArgs>
    | typeof noParentContextSymbol;

  static create<BaseContext, RouteArgs>(
    baseContext: BaseContext,
    routeArgs: RouteArgs,
  ) {
    return new WidgeteriaContext(baseContext, routeArgs, noParentContextSymbol);
  }

  private constructor(
    baseContext: BaseContext,
    routeArgs: RouteArgs,
    parent:
      | typeof noParentContextSymbol
      | WidgeteriaContext<BaseContext, RouteArgs>,
  ) {
    this.#baseContext = baseContext;
    this.#routeArgs = routeArgs;
    this.#parent = parent;
    this.#messageBus =
      parent === noParentContextSymbol
        ? new MessageBus<WidgeteriaContext<BaseContext, RouteArgs>>((c) => {
            return c.#getParentContext();
          })
        : parent.getMessageBus();
  }

  #getParentContext():
    | WidgeteriaContext<BaseContext, RouteArgs>
    | typeof noParentContextSymbol {
    return this.#parent;
  }

  getBaseContext() {
    return this.#baseContext;
  }

  getRouteArgs() {
    return this.#routeArgs;
  }

  getMessageBus() {
    return this.#messageBus;
  }

  createChild() {
    return new WidgeteriaContext(this.#baseContext, this.#routeArgs, this);
  }
}

type CreateWidgeteriaContextArgs<BaseContext, RouteArgs> = {
  baseContext: BaseContext;
  routeArgs: RouteArgs;
};
export function createWidgeteriaContext<BaseContext, RouteArgs>({
  baseContext,
  routeArgs,
}: CreateWidgeteriaContextArgs<BaseContext, RouteArgs>) {
  return WidgeteriaContext.create(baseContext, routeArgs);
}
