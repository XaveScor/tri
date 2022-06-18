import { TriContext } from '@tri/context';
import { RenderSchema, viewArgs } from './controller';
import { TriView } from './view';
import { AbstractRender } from '@tri/abstract/src/abstract-render';

export class Widget<BaseContext, ViewArgs, ViewResult> {
  readonly #context: TriContext<BaseContext>;
  readonly #renderSchema: RenderSchema<ViewArgs>;
  readonly #view: TriView<ViewArgs, ViewResult>;

  constructor(
    context: TriContext<BaseContext>,
    renderSchema: RenderSchema<ViewArgs>,
    view: TriView<ViewArgs, ViewResult>,
  ) {
    this.#context = context;
    this.#renderSchema = renderSchema;
    this.#view = view;
  }

  async render(render: AbstractRender<ViewResult>): Promise<string> {
    const args = await this.#renderSchema[viewArgs];
    const viewResult = this.#view({ args });
    return render.render(viewResult);
  }
}
