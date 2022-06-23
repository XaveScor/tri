import { createWidgeteriaController, viewArgs } from '@widgeteria/widget';
import { WidgetArgs } from './types';

export const controller = createWidgeteriaController(
  (ctx, args: WidgetArgs) => {
    return {
      [viewArgs]: { b: args.args.a },
    };
  },
);
