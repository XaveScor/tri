import { createTriView } from '@widgeteria/widget';
import { ViewArgs } from './types';

export const view = createTriView(({ args }: ViewArgs) => args.b);
