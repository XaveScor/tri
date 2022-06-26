import { createWidgeteriaController, viewArgs } from '@widgeteria/widget';
import { Context, WidgetArgs } from './types';

export const controller = createWidgeteriaController(
  (ctx: Context, args: WidgetArgs) => {
    return {
      [viewArgs]: { b: args.args.a },
    };
  },
);
