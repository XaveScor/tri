import { createTriView } from '@widgeteria/widget';
import React from 'react';
import { ViewArgs } from './types';

export const view = createTriView(({ args }: ViewArgs) => <>{args.b}</>);
