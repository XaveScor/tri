import { WidgeteriaContext } from '@widgeteria/context';
import { RenderSchema, slotArgs, viewArgs } from './controller';
import { WidgeteriaView } from './view';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';

export class Widget<BaseContext, ViewArgs, ViewResult> {
  readonly #context: WidgeteriaContext<BaseContext>;
  readonly #renderSchema: RenderSchema<ViewArgs>;
  readonly #view: WidgeteriaView<ViewArgs, ViewResult>;

  constructor(
    context: WidgeteriaContext<BaseContext>,
    renderSchema: RenderSchema<ViewArgs>,
    view: WidgeteriaView<ViewArgs, ViewResult>,
  ) {
    this.#context = context;
    this.#renderSchema = renderSchema;
    this.#view = view;
  }

  async render(render: WidgeteriaAbstractRender<ViewResult>): Promise<string> {
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

export type _Widget<BaseContext, ViewArgs, ViewResult> = Widget<
  BaseContext,
  ViewArgs,
  ViewResult
>;
