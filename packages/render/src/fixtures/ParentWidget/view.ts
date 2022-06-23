import { createTriView } from '@widgeteria/widget';
import { ViewArgs } from './types';
import { createSlotSplitString } from '@widgeteria/slot';

export const view = createTriView(
  ({ args }: ViewArgs) => args.b + ' split ' + createSlotSplitString('slot'),
);
