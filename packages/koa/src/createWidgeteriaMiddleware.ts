import Koa from 'koa';
import { createWidgeteriaContext } from '@widgeteria/context';
import { widgeteriaRender } from '@widgeteria/render';
import { createWriter } from './createWriter';
import { WidgeteriaReactRender } from '@widgeteria/react';
import React from 'react';
import { WidgeteriaAbstractWidgetDeclaration } from '@widgeteria/abstract';

export function createWidgeteriaMiddleware<WidgetArgs, ViewArgs>(
  widgetDeclaration: WidgeteriaAbstractWidgetDeclaration<
    Koa.Context,
    any,
    WidgetArgs,
    React.ReactElement
  >,
  args: WidgetArgs,
) {
  return async (baseContext: Koa.Context) => {
    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: {},
    });

    await widgeteriaRender<
      Koa.Context,
      any,
      WidgetArgs,
      ViewArgs,
      React.ReactElement
    >({
      context: widgeteriaContext,
      args,
      writer: createWriter(widgeteriaContext),
      widgetDeclaration,
      render: new WidgeteriaReactRender(),
    });
  };
}
