import Koa from 'koa';
import { createWidgeteriaContext } from '@widgeteria/context';
import { widgeteriaRender } from '@widgeteria/render';
import { createWriter } from './create-writer';
import { WidgeteriaRouter } from '@widgeteria/router';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import { WidgeteriaWidgetDeclaration } from '@widgeteria/widget';

type _BaseWidgetDescription<ViewResult, WidgetArgs> = {
  widgetDeclaration: WidgeteriaWidgetDeclaration<
    Koa.Context,
    unknown,
    WidgetArgs,
    unknown,
    ViewResult
  >;
  args: WidgetArgs;
};

export type BaseWidgetDescription = _BaseWidgetDescription<unknown, unknown>;

export function createWidgeteriaMiddleware<ViewResult>(
  baseWidgeteriaDeclaration: WidgeteriaWidgetDeclaration<
    Koa.Context,
    unknown,
    _BaseWidgetDescription<ViewResult, unknown>,
    unknown,
    ViewResult
  >,
  router: WidgeteriaRouter<Koa.Context, ViewResult>,
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

    await widgeteriaRender({
      context: widgeteriaContext,
      args: {
        widgetDeclaration: route.widgetDeclaration,
        args: route.widgetArgs,
      },
      writer: createWriter(widgeteriaContext),
      widgetDeclaration: baseWidgeteriaDeclaration,
      render,
    });
  };
}
