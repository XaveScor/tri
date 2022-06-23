import {
  MessageBus,
  noParentContextSymbol,
} from '@widgeteria/hierarchy-message-bus';

const contextSymbol = Symbol('context');

type WidgeteriaInnerContext<WidgeteriaContext> = {
  parent: WidgeteriaContext | typeof noParentContextSymbol;
  messageBus: MessageBus<WidgeteriaContext>;
};

export type WidgeteriaContext<Other> = Other & {
  [contextSymbol]: WidgeteriaInnerContext<WidgeteriaContext<Other>>;
};

export function getWidgeteriaInnerContext<T>(
  context: WidgeteriaContext<T>,
): WidgeteriaInnerContext<WidgeteriaContext<T>> {
  return context[contextSymbol];
}

export function createWidgeteriaContext<Other>(
  obj: Other,
): WidgeteriaContext<Other> {
  return {
    ...obj,
    [contextSymbol]: {
      messageBus: new MessageBus<WidgeteriaContext<Other>>((c) => {
        return getWidgeteriaInnerContext(c).parent;
      }),
      parent: noParentContextSymbol,
    },
  };
}

export function createChildrenWidgeteriaContext<Other>(
  context: WidgeteriaContext<Other>,
): WidgeteriaContext<Other> {
  const innerContext = getWidgeteriaInnerContext(context);
  return {
    ...context,
    [contextSymbol]: {
      messageBus: innerContext.messageBus,
      parent: context,
    },
  };
}

export function getMessageBus<Context>(
  context: WidgeteriaContext<Context>,
): MessageBus<WidgeteriaContext<Context>> {
  return getWidgeteriaInnerContext(context).messageBus;
}
