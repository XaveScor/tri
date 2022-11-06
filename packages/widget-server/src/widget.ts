import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import {
  WidgeteriaWidget,
  WidgeteriaWidgetArgs,
  WidgetSchema,
  RenderSchema,
  viewArgs,
  slotArgs,
  OnlyForClient,
} from '@widgeteria/widget';

export class WidgeteriaServerWidget<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> implements
    WidgeteriaWidget<BaseContext, RouteArgs, WidgetArgs, ViewArgs, ViewResult>
{
  readonly #renderSchema: RenderSchema<ViewArgs>;

  constructor(
    private readonly context: WidgeteriaContext<BaseContext, RouteArgs>,
    args: WidgetArgs,
    private readonly schema: WidgetSchema<
      BaseContext,
      RouteArgs,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >,
  ) {
    const widgetArgs: WidgeteriaWidgetArgs<WidgetArgs> = { args };
    this.#renderSchema = schema.controller(this.context, widgetArgs);
  }

  async render(render: WidgeteriaAbstractRender<ViewResult>): Promise<string> {
    const args = await this.#renderSchema[viewArgs];
    const viewResult = this.schema.view({ args });
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

  hydrate(element: HTMLElement) {
    throw new OnlyForClient('hydrate');
  }
}
