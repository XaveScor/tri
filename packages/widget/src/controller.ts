import { Promisable } from '@widgeteria/promise';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaWidget } from './widget';

export const viewArgs = Symbol('controller view args');
export const slotArgs = Symbol('controller slots args');

export type RenderSchema<ViewArgs> = {
  [viewArgs]?: Promisable<ViewArgs>;
  [slotArgs]?: { [name: string]: WidgeteriaWidget<any, any, any, any, any> };
};

export type WidgeteriaWidgetArgs<WidgetArgs> = {
  args: WidgetArgs;
};

export type WidgeteriaController<BaseContext, RouteArgs, WidgetArgs, ViewArgs> =
  (
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    widgetArgs: WidgeteriaWidgetArgs<WidgetArgs>,
  ) => RenderSchema<ViewArgs>;

export function createWidgeteriaController<
  BaseContext,
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
) {
  return controller;
}
