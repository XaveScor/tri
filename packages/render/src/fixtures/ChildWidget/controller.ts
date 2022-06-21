import { createTriController, viewArgs } from '@tri/widget';
import { WidgetArgs } from './types';

export const controller = createTriController((ctx, args: WidgetArgs) => {
  return {
    [viewArgs]: { b: args.args.a },
  };
});
