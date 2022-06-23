import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaWidgetArgs } from './widgetArgs';
import { Promisable } from '@widgeteria/promise';
import { Widget } from './widget';

export const viewArgs = Symbol('controller view args');
export const slotArgs = Symbol('controller slots args');

export type RenderSchema<ViewArgs> = {
  [viewArgs]: Promisable<ViewArgs>;
  [slotArgs]?: { [name: string]: Widget<any, any, any> };
};

export type WidgeteriaController<BaseContext, WidgetArgs, ViewArgs> = (
  context: WidgeteriaContext<BaseContext>,
  widgetArgs: WidgeteriaWidgetArgs<WidgetArgs>,
) => RenderSchema<ViewArgs>;

export function createWidgeteriaController<BaseContext, WidgetArgs, ViewArgs>(
  controller: WidgeteriaController<BaseContext, WidgetArgs, ViewArgs>,
) {
  return controller;
}
