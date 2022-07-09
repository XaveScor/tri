import { createWidgeteriaView } from '@widgeteria/widget';
import { ViewArgs } from './types';
import { createWidgeteriaSlotSplitString } from '@widgeteria/slot';

export const view = createWidgeteriaView(
  ({ args }: ViewArgs) =>
    args.b + ' split ' + createWidgeteriaSlotSplitString('slot'),
);
