import Koa from 'koa';
import { createWidgeteriaContext } from '@widgeteria/context';
import { widgeteriaRender } from '@widgeteria/render';
import { createWriter } from './create-writer';
import { WidgeteriaRouter } from '@widgeteria/router';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';

export function createWidgeteriaMiddleware<WidgetArgs, ViewArgs, ViewResult>(
  router: WidgeteriaRouter<Koa.Context, ViewArgs, ViewResult>,
  render: WidgeteriaAbstractRender<ViewResult>,
) {
  return async <RouteArgs, WidgetArgs>(
    baseContext: Koa.Context,
    next: Koa.Next,
  ) => {
    const route = router.parse<RouteArgs, WidgetArgs>(baseContext.request.url);

    if (!route) {
      return next();
    }

    const widgeteriaContext = createWidgeteriaContext({
      baseContext,
      routeArgs: route.routeArgs,
    });

    await widgeteriaRender({
      context: widgeteriaContext,
      args: route.widgetArgs,
      writer: createWriter(widgeteriaContext),
      widgetDeclaration: route.widgetDeclaration,
      render,
    });
  };
}
