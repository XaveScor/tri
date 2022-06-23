import {
  MessageBus,
  noParentContextSymbol,
} from '@widgeteria/hierarchy-message-bus';

const contextSymbol = Symbol('context');

type WidgeteriaInnerContext<WidgeteriaContext> = {
  parent: WidgeteriaContext | typeof noParentContextSymbol;
  messageBus: MessageBus<WidgeteriaContext>;
};

export type WidgeteriaContext<Other> = Other;

function getWidgeteriaInnerContext<T>(
  context: WidgeteriaContext<T>,
): WidgeteriaInnerContext<WidgeteriaContext<T>> {
  return context[contextSymbol];
}

export function createWidgeteriaContext<Other extends object>(
  obj: Other,
): WidgeteriaContext<Other> {
  const innerContext = {
    messageBus: new MessageBus<WidgeteriaContext<Other>>((c) => {
      return getWidgeteriaInnerContext(c).parent;
    }),
    parent: noParentContextSymbol,
  };

  return new Proxy(obj, {
    get(target: Other, p: string | symbol, receiver: any): any {
      if (p === contextSymbol) {
        return innerContext;
      }

      return Reflect.get(target, p, receiver);
    },
  });
}

export function createChildrenWidgeteriaContext<Other extends object>(
  context: WidgeteriaContext<Other>,
): WidgeteriaContext<Other> {
  const childrenInnerContext = {
    messageBus: getMessageBus(context),
    parent: context,
  };
  return new Proxy(context, {
    get(
      target: WidgeteriaContext<Other>,
      p: string | symbol,
      receiver: any,
    ): any {
      if (p === contextSymbol) {
        return childrenInnerContext;
      }

      return Reflect.get(target, p, receiver);
    },
  });
}

export function getMessageBus<Context>(
  context: WidgeteriaContext<Context>,
): MessageBus<WidgeteriaContext<Context>> {
  return getWidgeteriaInnerContext(context).messageBus;
}
