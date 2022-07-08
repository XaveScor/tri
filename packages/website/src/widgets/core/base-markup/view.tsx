import { createWidgeteriaView } from '@widgeteria/widget';
import React from 'react';
import { WidgeteriaSlot } from '@widgeteria/react';

export const view = createWidgeteriaView(() => (
  <html>
    <head>
      <title>Widgeteria</title>
    </head>
    <body>
      <WidgeteriaSlot name="navigation" />
      <WidgeteriaSlot name="content" />
    </body>
  </html>
));
