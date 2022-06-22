import { createTriView } from '@drzewo/widget';
import { ViewArgs } from './types';
import { createSlotSplitString } from '@drzewo/slot';

export const view = createTriView(
  ({ args }: ViewArgs) => args.b + ' split ' + createSlotSplitString('slot'),
);
