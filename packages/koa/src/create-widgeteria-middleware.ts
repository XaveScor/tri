import Koa from 'koa';
import { createWidgeteriaContext } from '@widgeteria/context';
import { widgeteriaRender } from '@widgeteria/render';
import { createWriter } from './createWriter';
import { WidgeteriaReactRender } from '@widgeteria/react';
import React from 'react';
import { WidgeteriaRouter } from '@widgeteria/router';

export function createWidgeteriaMiddleware<WidgetArgs, ViewArgs>(
  router: WidgeteriaRouter<
    Koa.Context,
    WidgetArgs,
    ViewArgs,
    React.ReactElement
  >,
  args: WidgetArgs,
) {
  return async (baseContext: Koa.Context, next: Koa.Next) => {
    const route = router.parse(baseContext.request.url);

    if (!route) {
      return next();
    }

    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: route.routeArgs,
    });

    await widgeteriaRender<
      Koa.Context,
      typeof route.routeArgs,
      WidgetArgs,
      ViewArgs,
      React.ReactElement
    >({
      context: widgeteriaContext,
      args,
      writer: createWriter(widgeteriaContext),
      widgetDeclaration: route.widgetDeclaration,
      render: new WidgeteriaReactRender(),
    });
  };
}
