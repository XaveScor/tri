import { WidgeteriaContext } from '@widgeteria/context';
import { Promisable } from '@widgeteria/promise';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import { WidgetDeclaration } from '../src/declaration';

export type WidgeteriaViewArgs<ViewArgs> = {
  args: ViewArgs;
};

type WidgeteriaView<ViewArgs, ViewResult> = (
  args: WidgeteriaViewArgs<ViewArgs>,
) => ViewResult;

export type ICreateWidgeteriaView = <ViewArgs, ViewResult>(
  view: WidgeteriaView<ViewArgs, ViewResult>,
) => WidgeteriaView<ViewArgs, ViewResult>;

export interface WidgeteriaWidget<
  BaseContext,
  RouteArgs,
  ViewArgs,
  ViewResult,
> {
  render(render: WidgeteriaAbstractRender<ViewResult>): Promise<string>;
  getSlotRenderSchema<_ViewArgs>(
    name: string,
  ): WidgeteriaWidget<BaseContext, RouteArgs, _ViewArgs, ViewResult>;
}

export declare const viewArgs: unique symbol;
export declare const slotArgs: unique symbol;

export type RenderSchema<ViewArgs> = {
  [viewArgs]?: Promisable<ViewArgs>;
  [slotArgs]?: { [name: string]: WidgeteriaWidget<any, any, any, any> };
};

export type WidgeteriaWidgetArgs<WidgetArgs> = {
  args: WidgetArgs;
};

type WidgeteriaController<BaseContext, RouteArgs, WidgetArgs, ViewArgs> = (
  context: WidgeteriaContext<BaseContext, RouteArgs>,
  widgetArgs: WidgeteriaWidgetArgs<WidgetArgs>,
) => RenderSchema<ViewArgs>;

export type ICreateWidgeteriaController = <
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
>(
  controller: WidgeteriaController<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs
  >,
) => WidgeteriaController<BaseContext, RouteArgs, WidgetArgs, ViewArgs>;
