import { createWidgeteriaView } from '@widgeteria/widget';
import React from 'react';
import { ViewArgs } from './types';

export const view = createWidgeteriaView(({ args }: ViewArgs) => <>{args.b}</>);
