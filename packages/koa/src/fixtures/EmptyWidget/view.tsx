import { createWidgeteriaView } from '@widgeteria/widget';
import React from 'react';
import { ViewArgs } from './types';
import { WidgeteriaSlot } from '@widgeteria/react';

export const view = createWidgeteriaView((args: ViewArgs) => (
  <>
    <WidgeteriaSlot name="content"></WidgeteriaSlot>
  </>
));
