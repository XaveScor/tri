import { createTriView } from '@tri/widget';
import { ViewArgs } from './types';
import { Slot } from '@tri/react';
import React from 'react';

export const view = createTriView(({ args }: ViewArgs) => (
  <>
    {args.b}
    split
    <Slot name="slot" />
  </>
));