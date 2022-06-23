import { createTriView } from '@widgeteria/widget';
import { ViewArgs } from './types';
import { Slot } from '@widgeteria/react';
import React from 'react';

export const view = createTriView(({ args }: ViewArgs) => (
  <>
    {args.b}
    split
    <Slot name="slot" />
  </>
));
