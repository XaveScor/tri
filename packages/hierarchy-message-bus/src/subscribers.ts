import {MessageFactory} from "./message";

export type Subscriber<Context, MessageData> = (
  message: MessageData,
  originalContext: Context
) => unknown;

type AnyMessageFactory = MessageFactory<any>;
type AnySubscriber<Context> = Subscriber<Context, any>;

export class Subscribers<Context> {
  readonly #subscribers = new Map<Context, Map<AnyMessageFactory, Array<AnySubscriber<Context>>>>;

  add<MessageData>(
    context: Context,
    messageFactory: MessageFactory<MessageData>,
    callback: Subscriber<Context, MessageData>,
  ) {
    const subscribers1 = this.#subscribers.get(context) ?? new Map<AnyMessageFactory, Array<AnySubscriber<Context>>>;
    const subscribers2 = subscribers1.get(messageFactory) ?? ([] as Array<AnySubscriber<Context>>);
    subscribers2.push(callback);
    subscribers1.set(messageFactory, subscribers2);
    this.#subscribers.set(context, subscribers1);
  }

  get<MessageData>(
    context: Context,
    messageFactory: MessageFactory<MessageData>
  ): ReadonlyArray<Subscriber<Context, MessageData>> {
    return this.#subscribers.get(context)?.get(messageFactory) ?? [];
  }

  destroy(context: Context) {
    this.#subscribers.delete(context);
  }
}
