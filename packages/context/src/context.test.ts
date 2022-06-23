import {
  createChildrenWidgeteriaContext,
  createWidgeteriaContext,
  getMessageBus,
} from './index';
import { MessageFactory } from '@widgeteria/hierarchy-message-bus';

describe('context base operations', () => {
  it('creation', () => {
    const otherContext = { a: 1, b: 3 };
    const widgeteriaContext = createWidgeteriaContext(otherContext);

    expect(widgeteriaContext).toMatchObject(otherContext);
  });

  it('children context', () => {
    const otherContext = { a: 1, b: 3 };
    const widgeteriaContext = createWidgeteriaContext(otherContext);

    expect(createChildrenWidgeteriaContext(widgeteriaContext)).toMatchObject(
      otherContext,
    );
  });
});

describe('message-bus', () => {
  it('fire message', () => {
    const widgeteriaContext = createWidgeteriaContext({});
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
    const widgeteriaContext = createWidgeteriaContext({});
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
    const widgeteriaContext = createWidgeteriaContext({});
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
