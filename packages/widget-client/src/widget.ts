import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import { WidgeteriaWidget, WidgetSchema } from '@widgeteria/widget';
import { OnlyForServer } from '@widgeteria/widget/src/errors';

type ClientWidgetSchema<BaseContext, RouteArgs, ViewArgs, ViewResult> = Omit<
  WidgetSchema<BaseContext, RouteArgs, any, ViewArgs, ViewResult>,
  'controller'
>;

export class WidgeteriaClientWidget<
  BaseContext,
  RouteArgs,
  ViewArgs,
  ViewResult,
> implements
    WidgeteriaWidget<BaseContext, RouteArgs, any, ViewArgs, ViewResult>
{
  constructor(
    private readonly context: WidgeteriaContext<BaseContext, RouteArgs>,
    args: any,
    private readonly schema: ClientWidgetSchema<
      BaseContext,
      RouteArgs,
      ViewArgs,
      ViewResult
    >,
  ) {}

  async render(render: WidgeteriaAbstractRender<ViewResult>): Promise<string> {
    throw new OnlyForServer('render');
  }

  getSlotRenderSchema<_ViewArgs>(
    name: string,
  ): WidgeteriaWidget<BaseContext, RouteArgs, any, _ViewArgs, ViewResult> {
    throw new OnlyForServer('getSlotRenderSchema');
  }

  hydrate(element: HTMLElement) {}
}
