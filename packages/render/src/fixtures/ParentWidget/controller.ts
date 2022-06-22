import { createTriController, viewArgs, slotArgs } from '@drzewo/widget';
import { WidgetArgs } from './types';
import { ChildWidget } from '../ChildWidget';

export const controller = createTriController((ctx, args: WidgetArgs) => {
  return {
    [viewArgs]: { b: args.args.a },
    [slotArgs]: {
      slot: ChildWidget.create(ctx, { a: 'hello child' }),
    },
  };
});
