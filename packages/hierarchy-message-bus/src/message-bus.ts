import { Message, MessageFactory } from "./message";
import { Subscriber, Subscribers } from "./subscribers";

export const noParentContextSymbol = Symbol("no parent context");

type GetParentContextFn<Context> = (
  context: Context
) => Context | typeof noParentContextSymbol;

export class MessageBus<Context> {
  readonly #getParentContext: GetParentContextFn<Context>;
  readonly #subscribers = new Subscribers<Context>();

  constructor(getParentContext: GetParentContextFn<Context>) {
    this.#getParentContext = getParentContext;
  }

  subscribe<MessageData>(
    context: Context,
    messageFactory: MessageFactory<MessageData>,
    callback: Subscriber<Context, MessageData>
  ) {
    this.#subscribers.add(context, messageFactory, callback);
  }

  destroyContext(context: Context) {
    this.#subscribers.destroy(context);
  }

  emitToTop<MessageData>(message: Message<Context, MessageData>) {
    let context: Context | typeof noParentContextSymbol = message.context;
    while (context !== noParentContextSymbol) {
      this.#emit(message, context);
      context = this.#getParentContext(context);
    }
  }

  #emit<MessageData>(message: Message<Context, MessageData>, context: Context) {
    this.#subscribers.get(context, message.type).forEach((subscriber) => {
      subscriber(message.data, message.context);
    });
  }

  emit<MessageData>(message: Message<Context, MessageData>, context?: Context) {
    this.#emit(message, message.context);
  }
}
