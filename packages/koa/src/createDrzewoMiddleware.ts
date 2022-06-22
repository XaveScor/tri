import Koa from 'koa';
import { createTriContext } from '@drzewo/context';
import { render } from '@drzewo/render';
import { createWriter } from './createWriter';
import { ReactRender } from '@drzewo/react';
import { WidgetDeclaration } from '@drzewo/widget';
import React from 'react';

export function createDrzewoMiddleware<WidgetArgs, ViewArgs>(
  widgetDeclaration: WidgetDeclaration<
    Koa.Context,
    WidgetArgs,
    ViewArgs,
    React.ReactElement
  >,
  args: WidgetArgs,
) {
  return async (context: Koa.Context) => {
    const triContext = createTriContext(context);

    await render<Koa.Context, WidgetArgs, ViewArgs, React.ReactElement>({
      context: triContext,
      args,
      writer: createWriter(context),
      widgetDeclaration,
      render: new ReactRender(),
    });
  };
}
