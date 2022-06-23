import { createWidgeteriaView } from '@widgeteria/widget';
import { ViewArgs } from './types';

export const view = createWidgeteriaView(({ args }: ViewArgs) => args.b);
