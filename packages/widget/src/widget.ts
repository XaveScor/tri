import { getTriInnerContext, TriContext } from '@tri/context';
import { AbstractWriter } from '@tri/abstract';
import { RenderSchema } from './controller';
import { renderedMessageFactory } from './rendered-message';

export class Widget<BaseContext, ViewArgs> {
  #context: TriContext<BaseContext>;
  #renderSchema: RenderSchema<ViewArgs>;

  constructor(
    context: TriContext<BaseContext>,
    renderSchema: RenderSchema<ViewArgs>,
  ) {
    this.#context = context;
    this.#renderSchema = renderSchema;
  }

  async render(writer: AbstractWriter) {
    const triInnerContext = getTriInnerContext(this.#context);

    const renderedMessage = renderedMessageFactory.create(this.#context);
    triInnerContext.messageBus.emitToTop(renderedMessage);
  }
}
