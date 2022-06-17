import { MessageBus, noParentContextSymbol, MessageFactory } from "./index";

describe("base", () => {
  it("base event-emitter", () => {
    const context = Symbol("context");
    const messageBus = new MessageBus<typeof context>(
      () => noParentContextSymbol
    );

    const subscriber = jest.fn();
    const data = "abc";

    const messageFactory = new MessageFactory<string>();
    messageBus.subscribe(context, messageFactory, subscriber);

    const message = messageFactory.create(context, data);
    messageBus.emitToTop(message);

    expect(subscriber).toBeCalledTimes(1);
    expect(subscriber).toBeCalledWith(data, context);
  });

  it("message should fire only own type", () => {
    const context = Symbol("context");
    const messageBus = new MessageBus<typeof context>(
      () => noParentContextSymbol
    );

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    const data = "abc";

    const messageFactory1 = new MessageFactory<string>();
    const messageFactory2 = new MessageFactory<string>();
    messageBus.subscribe(context, messageFactory1, subscriber1);
    messageBus.subscribe(context, messageFactory2, subscriber2);

    const message = messageFactory1.create(context, data);
    messageBus.emitToTop(message);

    expect(subscriber1).toBeCalledTimes(1);
    expect(subscriber2).toBeCalledTimes(0);
  });

  it("destroy context", () => {
    const context = Symbol("context");
    const messageBus = new MessageBus<typeof context>(
      () => noParentContextSymbol
    );

    const subscriber = jest.fn();
    const data = "abc";

    const messageFactory = new MessageFactory<string>();
    messageBus.subscribe(context, messageFactory, subscriber);

    messageBus.destroyContext(context);

    const message = messageFactory.create(context, data);
    messageBus.emitToTop(message);

    expect(subscriber).toBeCalledTimes(0);
  });
});

describe("emit to top", () => {
  it("subscribe on parent context", () => {
    const context = Symbol("context");
    const childrenContext = Symbol("children context");
    const messageBus = new MessageBus<typeof context | typeof childrenContext>(
      (c) => (c === childrenContext ? context : noParentContextSymbol)
    );

    const subscriber = jest.fn();
    const childrenSubscriber = jest.fn();
    const data = "abc";

    const messageFactory = new MessageFactory<string>();
    messageBus.subscribe(context, messageFactory, subscriber);
    messageBus.subscribe(childrenContext, messageFactory, childrenSubscriber);

    const message = messageFactory.create(childrenContext, data);
    messageBus.emitToTop(message);

    expect(subscriber).toBeCalledTimes(1);
    expect(subscriber).toBeCalledWith(data, childrenContext);
    expect(childrenSubscriber).toBeCalledTimes(1);
    expect(childrenSubscriber).toBeCalledWith(data, childrenContext);
  });
});

describe("emit current level only", () => {
  it("subscribe on parent context", () => {
    const context = Symbol("context");
    const childrenContext = Symbol("children context");
    const messageBus = new MessageBus<typeof context | typeof childrenContext>(
      (c) => (c === childrenContext ? context : noParentContextSymbol)
    );

    const subscriber = jest.fn();
    const childrenSubscriber = jest.fn();
    const data = "abc";

    const messageFactory = new MessageFactory<string>();
    messageBus.subscribe(context, messageFactory, subscriber);
    messageBus.subscribe(childrenContext, messageFactory, childrenSubscriber);

    const message = messageFactory.create(childrenContext, data);
    messageBus.emit(message);

    expect(subscriber).not.toBeCalled();
    expect(childrenSubscriber).toBeCalled();
  });
});
