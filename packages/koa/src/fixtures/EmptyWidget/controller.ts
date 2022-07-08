import {
  createWidgeteriaController,
  slotArgs,
  viewArgs,
  WidgeteriaWidgetArgs,
} from '@widgeteria/widget';
import { WidgeteriaContext } from '@widgeteria/context';
import Koa from 'koa';
import { BaseWidgetDescription } from '../../index';

export const controller = createWidgeteriaController(
  (
    ctx: WidgeteriaContext<Koa.Context, any>,
    { args }: WidgeteriaWidgetArgs<BaseWidgetDescription>,
  ) => {
    return {
      [viewArgs]: {},
      [slotArgs]: {
        content: args.widgetDeclaration.create(ctx, args.args),
      },
    };
  },
);
