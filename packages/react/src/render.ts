import { AbstractRender } from '@drzewo/abstract';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';

export class ReactRender extends AbstractRender<React.ReactElement> {
  render(viewResult: React.ReactElement): string {
    return ReactDomServer.renderToString(viewResult);
  }
}
