import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';

export class WidgeteriaReactRender
  implements WidgeteriaAbstractRender<React.ReactElement>
{
  render(viewResult: React.ReactElement): string {
    return ReactDomServer.renderToString(viewResult);
  }
}
