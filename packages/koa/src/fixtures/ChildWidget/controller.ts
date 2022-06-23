import { createTriController, viewArgs } from '@widgeteria/widget';
import { WidgetArgs } from './types';
import { TriContext } from '@widgeteria/context';
import Koa from 'koa';

export const controller = createTriController(
  (ctx: TriContext<Koa.Context>, args: WidgetArgs) => {
    return {
      [viewArgs]: { b: args.args.a },
    };
  },
);
