import { createTriView } from '@tri/widget';
import { ViewArgs } from './types';

export const view = createTriView(({ args }: ViewArgs) => args.b);
