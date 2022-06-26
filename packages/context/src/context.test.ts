import { createWidgeteriaContext } from './index';
import { MessageFactory } from '@widgeteria/hierarchy-message-bus';

describe('context base operations', () => {
  it('creation', () => {
    const baseContext = { a: 1, b: 3 };
    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: {},
    });

    expect(widgeteriaContext.getBaseContext()).toMatchObject(baseContext);
  });

  it('children context', () => {
    const baseContext = { a: 1, b: 3 };
    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: {},
    });

    expect(widgeteriaContext.createChild().getBaseContext()).toMatchObject(
      baseContext,
    );
  });
});

describe('message-bus', () => {
  it('fire message', () => {
    const widgeteriaContext = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });
    const messageBus = widgeteriaContext.getMessageBus();

    const messageFactory = new MessageFactory<string>();
    const subscriber = jest.fn();
    messageBus.subscribe(widgeteriaContext, messageFactory, subscriber);

    const data = 'asd';
    const message = messageFactory.create(widgeteriaContext, data);
    messageBus.emit(message);

    expect(subscriber).toBeCalledTimes(1);
    expect(subscriber).toBeCalledWith(data, widgeteriaContext);
  });

  it('fire message to top', () => {
    const widgeteriaContext = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });
    const childrenWidgeteriaContext = widgeteriaContext.createChild();

    const messageBus = widgeteriaContext.getMessageBus();
    const childrenMessageBus = childrenWidgeteriaContext.getMessageBus();

    const messageFactory = new MessageFactory<string>();
    const subscriber = jest.fn();
    messageBus.subscribe(widgeteriaContext, messageFactory, subscriber);

    const data = 'asd';
    const message = messageFactory.create(childrenWidgeteriaContext, data);
    childrenMessageBus.emitToTop(message);

    expect(subscriber).toBeCalledTimes(1);
    expect(subscriber).toBeCalledWith(data, childrenWidgeteriaContext);
  });

  it('fire message on current level', () => {
    const widgeteriaContext = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });
    const childrenWidgeteriaContext = widgeteriaContext.createChild();

    const messageBus = widgeteriaContext.getMessageBus();
    const childrenMessageBus = childrenWidgeteriaContext.getMessageBus();

    const messageFactory = new MessageFactory<string>();
    const subscriber = jest.fn();
    const childrenSubscriber = jest.fn();
    messageBus.subscribe(widgeteriaContext, messageFactory, subscriber);
    childrenMessageBus.subscribe(
      childrenWidgeteriaContext,
      messageFactory,
      childrenSubscriber,
    );

    const data = 'asd';
    const message = messageFactory.create(childrenWidgeteriaContext, data);
    childrenMessageBus.emit(message);

    expect(subscriber).not.toBeCalled();
    expect(childrenSubscriber).toBeCalledTimes(1);
  });
});

describe('route args', () => {
  it('validate', () => {
    const context = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {
        a: 1,
      },
    });

    expect(context.getRouteArgs()).toMatchObject({ a: 1 });
  });
});
