import { createTriView } from '@tri/widget';
import React from 'react';
import { ViewArgs } from './types';

export const view = createTriView(({ args }: ViewArgs) => <>{args.b}</>);
