import { TriContext } from '@drzewo/context';
import { RenderSchema, slotArgs, viewArgs } from './controller';
import { TriView } from './view';
import { AbstractRender } from '@drzewo/abstract/src/abstract-render';

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

  getSlotRenderSchema(name: string) {
    if (
      !(slotArgs in this.#renderSchema) ||
      !(name in this.#renderSchema[slotArgs])
    ) {
      throw Error('invalid Slot name in view ' + name);
    }

    return this.#renderSchema[slotArgs][name];
  }
}
