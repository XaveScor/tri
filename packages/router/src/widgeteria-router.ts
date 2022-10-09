import { WidgeteriaWidgetDeclaration } from '@widgeteria/widget';
import { WidgeteriaRoute } from './widgeteria-route';

type WidgeteriaRouteCheckResult<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> = {
  widgetDeclaration: WidgeteriaWidgetDeclaration<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs,
    ViewResult
  >;
  routeArgs: RouteArgs;
  widgetArgs: WidgetArgs;
};

type CompiledRoute<WidgetArgs> = {
  route: WidgeteriaRoute<any>;
  widgetDeclaration: WidgeteriaWidgetDeclaration<
    any,
    any,
    WidgetArgs,
    any,
    any
  >;
  widgetArgs: WidgetArgs;
};

export class WidgeteriaRouter<BaseContext, ViewResult> {
  readonly #routes: Array<CompiledRoute<any>> = [];

  register<WidgetArgs>(
    route: WidgeteriaRoute<any>,
    widgetDeclaration: WidgeteriaWidgetDeclaration<
      BaseContext,
      unknown,
      WidgetArgs,
      unknown,
      ViewResult
    >,
    widgetArgs: WidgetArgs,
  ) {
    this.#routes.push({
      route,
      widgetDeclaration,
      widgetArgs,
    });
  }

  parse(
    url: string,
  ): WidgeteriaRouteCheckResult<
    BaseContext,
    unknown,
    unknown,
    unknown,
    ViewResult
  > | null {
    for (const route of this.#routes) {
      const routeArgs = route.route.parse(url);
      if (!routeArgs) {
        continue;
      }

      return {
        widgetDeclaration: route.widgetDeclaration,
        widgetArgs: route.widgetArgs,
        routeArgs,
      };
    }

    return null;
  }
}
