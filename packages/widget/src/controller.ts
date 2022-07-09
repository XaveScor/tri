import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaWidgetArgs } from './widgetArgs';
import { Promisable } from '@widgeteria/promise';
import { Widget } from './widget';

export const viewArgs = Symbol('controller view args');
export const slotArgs = Symbol('controller slots args');

export type RenderSchema<ViewArgs> = {
  [viewArgs]?: Promisable<ViewArgs>;
  [slotArgs]?: { [name: string]: Widget<any, any, any, any> };
};

export type WidgeteriaController<BaseContext, RouteArgs, WidgetArgs, ViewArgs> =
  (
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    widgetArgs: WidgeteriaWidgetArgs<WidgetArgs>,
  ) => RenderSchema<ViewArgs>;

export function createWidgeteriaController<
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
) {
  return controller;
}
