import { TriContext } from '@tri/context';
import { TriWidgetArgs } from './widgetArgs';
import { Promisable } from '@tri/promise';

export const viewArgs = Symbol('controller view args');

export type RenderSchema<ViewArgs> = {
  [viewArgs]: Promisable<ViewArgs>;
};

export type TriController<BaseContext, WidgetArgs, ViewArgs> = (
  context: TriContext<BaseContext>,
  widgetArgs: TriWidgetArgs<WidgetArgs>,
) => RenderSchema<ViewArgs>;

export function createController<BaseContext, WidgetArgs, ViewArgs>(
  controller: TriController<BaseContext, WidgetArgs, ViewArgs>,
) {
  return controller;
}
