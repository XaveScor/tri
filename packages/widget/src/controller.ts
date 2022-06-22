import { TriContext } from '@drzewo/context';
import { TriWidgetArgs } from './widgetArgs';
import { Promisable } from '@drzewo/promise';
import { Widget } from './widget';

export const viewArgs = Symbol('controller view args');
export const slotArgs = Symbol('controller slots args');

export type RenderSchema<ViewArgs> = {
  [viewArgs]: Promisable<ViewArgs>;
  [slotArgs]?: { [name: string]: Widget<any, any, any> };
};

export type TriController<BaseContext, WidgetArgs, ViewArgs> = (
  context: TriContext<BaseContext>,
  widgetArgs: TriWidgetArgs<WidgetArgs>,
) => RenderSchema<ViewArgs>;

export function createTriController<BaseContext, WidgetArgs, ViewArgs>(
  controller: TriController<BaseContext, WidgetArgs, ViewArgs>,
) {
  return controller;
}
