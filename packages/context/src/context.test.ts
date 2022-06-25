import {
  createChildrenWidgeteriaContext,
  createWidgeteriaContext,
  getMessageBus,
  getRouteArgs,
} from './index';
import { MessageFactory } from '@widgeteria/hierarchy-message-bus';

describe('context base operations', () => {
  it('creation', () => {
    const baseContext = { a: 1, b: 3 };
    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: {},
    });

    expect(widgeteriaContext).toMatchObject(baseContext);
  });

  it('children context', () => {
    const baseContext = { a: 1, b: 3 };
    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: {},
    });

    expect(createChildrenWidgeteriaContext(widgeteriaContext)).toMatchObject(
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
    const messageBus = getMessageBus(widgeteriaContext);

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
    const childrenWidgeteriaContext =
      createChildrenWidgeteriaContext(widgeteriaContext);

    const messageBus = getMessageBus(widgeteriaContext);
    const childrenMessageBus = getMessageBus(childrenWidgeteriaContext);

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
    const childrenWidgeteriaContext =
      createChildrenWidgeteriaContext(widgeteriaContext);

    const messageBus = getMessageBus(widgeteriaContext);
    const childrenMessageBus = getMessageBus(childrenWidgeteriaContext);

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

    expect(getRouteArgs(context)).toMatchObject({ a: 1 });
  });
});
