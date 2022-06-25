import {
  MessageBus,
  noParentContextSymbol,
} from '@widgeteria/hierarchy-message-bus';
import { WidgeteriaAbstractContext } from '@widgeteria/abstract';

const contextSymbol = Symbol('context');

type WidgeteriaInnerContext<BaseContext extends object, RouteArgs> = {
  parent:
    | WidgeteriaContext<BaseContext, RouteArgs>
    | typeof noParentContextSymbol;
  messageBus: MessageBus<WidgeteriaContext<BaseContext, RouteArgs>>;
  routeArgs: RouteArgs;
};

export type WidgeteriaContext<
  Other extends object,
  RouteArgs,
> = WidgeteriaAbstractContext<Other, RouteArgs>;

function getWidgeteriaInnerContext<T extends object, RouteArgs>(
  context: WidgeteriaContext<T, RouteArgs>,
): WidgeteriaInnerContext<T, RouteArgs> {
  return context[contextSymbol];
}

export function createWidgeteriaContext<Other extends object, RouteArgs>({
  baseContext,
  routeArgs,
}: {
  baseContext: Other;
  routeArgs: RouteArgs;
}): WidgeteriaContext<Other, RouteArgs> {
  const innerContext: WidgeteriaInnerContext<Other, RouteArgs> = {
    messageBus: new MessageBus<WidgeteriaContext<Other, RouteArgs>>((c) => {
      return getWidgeteriaInnerContext(c).parent;
    }),
    parent: noParentContextSymbol,
    routeArgs,
  };

  return new Proxy(baseContext, {
    get(target, p, receiver) {
      if (p === contextSymbol) {
        return innerContext;
      }

      return Reflect.get(target, p, receiver);
    },
  });
}

export function createChildrenWidgeteriaContext<
  Other extends object,
  RouteArgs,
  WContext extends WidgeteriaContext<Other, RouteArgs>,
>(context: WContext): WContext {
  const childrenInnerContext: WidgeteriaInnerContext<Other, RouteArgs> = {
    messageBus: getMessageBus(context),
    parent: context,
    routeArgs: getRouteArgs(context),
  };
  return new Proxy(context, {
    get(target, p: string | symbol, receiver: any): any {
      if (p === contextSymbol) {
        return childrenInnerContext;
      }

      return Reflect.get(target, p, receiver);
    },
  });
}

export function getMessageBus<BaseContext extends object, RouteArgs>(
  context: WidgeteriaContext<BaseContext, RouteArgs>,
): MessageBus<WidgeteriaContext<BaseContext, RouteArgs>> {
  return getWidgeteriaInnerContext<BaseContext, RouteArgs>(context).messageBus;
}

export function getRouteArgs<RouteArgs>(
  context: WidgeteriaContext<any, RouteArgs>,
): RouteArgs {
  return getWidgeteriaInnerContext<any, RouteArgs>(context).routeArgs;
}
