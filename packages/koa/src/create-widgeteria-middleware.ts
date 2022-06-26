import Koa from 'koa';
import { createWidgeteriaContext } from '@widgeteria/context';
import { widgeteriaRender } from '@widgeteria/render';
import { createWriter } from './createWriter';
import { WidgeteriaRouter } from '@widgeteria/router';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';

export function createWidgeteriaMiddleware<WidgetArgs, ViewArgs, ViewResult>(
  router: WidgeteriaRouter<Koa.Context, WidgetArgs, ViewArgs, ViewResult>,
  args: WidgetArgs,
  render: WidgeteriaAbstractRender<ViewResult>,
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
      ViewResult
    >({
      context: widgeteriaContext,
      args,
      writer: createWriter(widgeteriaContext),
      widgetDeclaration: route.widgetDeclaration,
      render,
    });
  };
}
