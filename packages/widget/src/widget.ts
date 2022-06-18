import { getTriInnerContext, TriContext } from '@tri/context';
import { AbstractWriter } from '@tri/abstract';
import { RenderSchema, viewArgs } from './controller';
import { renderedMessageFactory } from './rendered-message';
import { TriView } from './view';

export class Widget<BaseContext, ViewArgs, ViewResult> {
  #context: TriContext<BaseContext>;
  #renderSchema: RenderSchema<ViewArgs>;
  #view: TriView<ViewArgs, ViewResult>;

  constructor(
    context: TriContext<BaseContext>,
    renderSchema: RenderSchema<ViewArgs>,
    view: TriView<ViewArgs, ViewResult>,
  ) {
    this.#context = context;
    this.#renderSchema = renderSchema;
    this.#view = view;
  }

  async render(writer: AbstractWriter<ViewResult>) {
    const viewResult = this.#view({ args: await this.#renderSchema[viewArgs] });
    writer.write(viewResult);

    const triInnerContext = getTriInnerContext(this.#context);

    const renderedMessage = renderedMessageFactory.create(this.#context);
    triInnerContext.messageBus.emitToTop(renderedMessage);
  }
}
