import {
  MessageBus,
  noParentContextSymbol,
} from '@drzewo/hierarchy-message-bus';

const contextSymbol = Symbol('context');

type TriInnerContext<TriContext> = {
  parent: TriContext | typeof noParentContextSymbol;
  messageBus: MessageBus<TriContext>;
};

export type TriContext<Other> = Other & {
  [contextSymbol]: TriInnerContext<TriContext<Other>>;
};

export function getTriInnerContext<T>(
  context: TriContext<T>,
): TriInnerContext<TriContext<T>> {
  return context[contextSymbol];
}

export function createTriContext<Other>(obj: Other): TriContext<Other> {
  return {
    ...obj,
    [contextSymbol]: {
      messageBus: new MessageBus<TriContext<Other>>((c) => {
        return getTriInnerContext(c).parent;
      }),
      parent: noParentContextSymbol,
    },
  };
}

export function createChildrenTriContext<Other>(
  context: TriContext<Other>,
): TriContext<Other> {
  const innerContext = getTriInnerContext(context);
  return {
    ...context,
    [contextSymbol]: {
      messageBus: innerContext.messageBus,
      parent: context,
    },
  };
}

export function getMessageBus<Context>(
  context: TriContext<Context>,
): MessageBus<TriContext<Context>> {
  return getTriInnerContext(context).messageBus;
}
