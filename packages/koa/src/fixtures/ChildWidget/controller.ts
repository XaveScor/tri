import { createTriController, viewArgs } from '@drzewo/widget';
import { WidgetArgs } from './types';
import { TriContext } from '@drzewo/context';
import Koa from 'koa';

export const controller = createTriController(
  (ctx: TriContext<Koa.Context>, args: WidgetArgs) => {
    return {
      [viewArgs]: { b: args.args.a },
    };
  },
);
