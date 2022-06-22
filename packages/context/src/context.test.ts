import {
  createChildrenTriContext,
  createTriContext,
  getMessageBus,
} from './index';
import { MessageFactory } from '@drzewo/hierarchy-message-bus';

describe('context base operations', () => {
  it('creation', () => {
    const otherContext = { a: 1, b: 3 };
    const triContext = createTriContext(otherContext);

    expect(triContext).toMatchObject(otherContext);
  });

  it('children context', () => {
    const otherContext = { a: 1, b: 3 };
    const triContext = createTriContext(otherContext);

    expect(createChildrenTriContext(triContext)).toMatchObject(otherContext);
  });
});

describe('message-bus', () => {
  it('fire message', () => {
    const triContext = createTriContext({});
    const messageBus = getMessageBus(triContext);

    const messageFactory = new MessageFactory<string>();
    const subscriber = jest.fn();
    messageBus.subscribe(triContext, messageFactory, subscriber);

    const data = 'asd';
    const message = messageFactory.create(triContext, data);
    messageBus.emit(message);

    expect(subscriber).toBeCalledTimes(1);
    expect(subscriber).toBeCalledWith(data, triContext);
  });

  it('fire message to top', () => {
    const triContext = createTriContext({});
    const triChindlenContext = createChildrenTriContext(triContext);

    const messageBus = getMessageBus(triContext);
    const childrenMessageBus = getMessageBus(triChindlenContext);

    const messageFactory = new MessageFactory<string>();
    const subscriber = jest.fn();
    messageBus.subscribe(triContext, messageFactory, subscriber);

    const data = 'asd';
    const message = messageFactory.create(triChindlenContext, data);
    childrenMessageBus.emitToTop(message);

    expect(subscriber).toBeCalledTimes(1);
    expect(subscriber).toBeCalledWith(data, triChindlenContext);
  });

  it('fire message on current level', () => {
    const triContext = createTriContext({});
    const childrenTriContext = createChildrenTriContext(triContext);

    const messageBus = getMessageBus(triContext);
    const childrenMessageBus = getMessageBus(childrenTriContext);

    const messageFactory = new MessageFactory<string>();
    const subscriber = jest.fn();
    const childrenSubscriber = jest.fn();
    messageBus.subscribe(triContext, messageFactory, subscriber);
    childrenMessageBus.subscribe(
      childrenTriContext,
      messageFactory,
      childrenSubscriber,
    );

    const data = 'asd';
    const message = messageFactory.create(childrenTriContext, data);
    childrenMessageBus.emit(message);

    expect(subscriber).not.toBeCalled();
    expect(childrenSubscriber).toBeCalledTimes(1);
  });
});
