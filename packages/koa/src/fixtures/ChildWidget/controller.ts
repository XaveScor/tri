import { createWidgeteriaController, viewArgs } from '@widgeteria/widget';
import { WidgetArgs } from './types';
import { WidgeteriaContext } from '@widgeteria/context';
import Koa from 'koa';

export const controller = createWidgeteriaController(
  (ctx: WidgeteriaContext<Koa.Context>, args: WidgetArgs) => {
    return {
      [viewArgs]: { b: args.args.a },
    };
  },
);
