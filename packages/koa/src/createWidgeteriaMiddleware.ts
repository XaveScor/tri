import Koa from 'koa';
import { createWidgeteriaContext } from '@widgeteria/context';
import { widgeteriaRender } from '@widgeteria/render';
import { createWriter } from './createWriter';
import { WidgeteriaReactRender } from '@widgeteria/react';
import { WidgeteriaWidgetDeclaration } from '@widgeteria/widget';
import React from 'react';

export function createWidgeteriaMiddleware<WidgetArgs, ViewArgs>(
  widgetDeclaration: WidgeteriaWidgetDeclaration<
    Koa.Context,
    WidgetArgs,
    ViewArgs,
    React.ReactElement
  >,
  args: WidgetArgs,
) {
  return async (context: Koa.Context) => {
    const widgeteriaContext = createWidgeteriaContext(context);

    await widgeteriaRender<
      Koa.Context,
      WidgetArgs,
      ViewArgs,
      React.ReactElement
    >({
      context: widgeteriaContext,
      args,
      writer: createWriter(context),
      widgetDeclaration,
      render: new WidgeteriaReactRender(),
    });
  };
}
