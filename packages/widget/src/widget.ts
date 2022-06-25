import { WidgeteriaContext } from '@widgeteria/context';
import { RenderSchema, slotArgs, viewArgs } from './controller';
import { WidgeteriaView } from './view';
import {
  WidgeteriaAbstractRender,
  WidgeteriaAbstractWidget,
} from '@widgeteria/abstract';

export class Widget<
  BaseContext extends object,
  RouteArgs,
  ViewArgs,
  ViewResult,
> extends WidgeteriaAbstractWidget<ViewResult> {
  readonly #context: WidgeteriaContext<BaseContext, RouteArgs>;
  readonly #renderSchema: RenderSchema<ViewArgs>;
  readonly #view: WidgeteriaView<ViewArgs, ViewResult>;

  constructor(
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    renderSchema: RenderSchema<ViewArgs>,
    view: WidgeteriaView<ViewArgs, ViewResult>,
  ) {
    super();
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
