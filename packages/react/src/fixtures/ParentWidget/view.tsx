import { createWidgeteriaView } from '@widgeteria/widget';
import { ViewArgs } from './types';
import { WidgeteriaSlot } from '@widgeteria/react';
import React from 'react';

export const view = createWidgeteriaView(({ args }: ViewArgs) => (
  <>
    {args.b}
    split
    <WidgeteriaSlot name="slot" />
  </>
));
