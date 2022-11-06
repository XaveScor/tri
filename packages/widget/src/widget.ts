import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgetSchema } from './declaration';

export interface WidgeteriaWidget<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> {
  render(render: WidgeteriaAbstractRender<ViewResult>): Promise<string>;
  getSlotRenderSchema<_ViewArgs>(
    name: string,
  ): WidgeteriaWidget<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    _ViewArgs,
    ViewResult
  >;
  hydrate(element: HTMLElement): void;
}

export interface WidgeteriaWidgetClass<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> extends Function {
  new (
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    args: WidgetArgs,
    schema: WidgetSchema<
      BaseContext,
      RouteArgs,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >,
  ): WidgeteriaWidget<BaseContext, RouteArgs, WidgetArgs, ViewArgs, ViewResult>;
}
