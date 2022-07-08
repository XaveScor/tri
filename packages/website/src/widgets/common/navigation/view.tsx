import { createWidgeteriaView } from '@widgeteria/widget';
import React from 'react';
import { ViewArgs } from './types';

export const view = createWidgeteriaView((args: ViewArgs) => (
  <React.Fragment>
    {args.args.pages.map((page) => (
      <a href={page.url} key={page.url}>
        {page.title}
      </a>
    ))}
  </React.Fragment>
));
