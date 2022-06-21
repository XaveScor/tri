import { createTriView } from '@tri/widget';
import { ViewArgs } from './types';
import { createSlotSplitString } from '@tri/slot';

export const view = createTriView(
  ({ args }: ViewArgs) => args.b + ' split ' + createSlotSplitString('slot'),
);
