export type Message<Context, Data> = {
  type: MessageFactory<Data>;
  context: Context;
  data: Data;
};

export class MessageFactory<Data> {
  create<Context>(context: Context, data: Data): Message<Context, Data> {
    return {
      type: this,
      context,
      data,
    };
  }
}
