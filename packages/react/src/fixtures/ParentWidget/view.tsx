import { createTriView } from '@drzewo/widget';
import { ViewArgs } from './types';
import { Slot } from '@drzewo/react';
import React from 'react';

export const view = createTriView(({ args }: ViewArgs) => (
  <>
    {args.b}
    split
    <Slot name="slot" />
  </>
));
