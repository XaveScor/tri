import {
  createWidgeteriaController,
  viewArgs,
  slotArgs,
} from '@widgeteria/widget';
import { WidgetArgs } from './types';
import { ChildWidget } from '../ChildWidget';

export const controller = createWidgeteriaController(
  (ctx, args: WidgetArgs) => {
    return {
      [viewArgs]: { b: args.args.a },
      [slotArgs]: {
        slot: ChildWidget.create(ctx, { a: 'hello child' }),
      },
    };
  },
);
