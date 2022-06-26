import { WidgeteriaWidgetDeclaration } from '@widgeteria/widget';

type ExtractRouteArgs<Path extends string> = string extends Path
  ? Record<string, string>
  : Path extends `${infer Start}/:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteArgs<Rest>]: string }
  : Path extends `${infer Start}/:${infer Param}`
  ? { [k in Param]: string }
  : {};

type WidgeteriaRoute<BaseContext, RouteArgs, WidgetArgs, ViewArgs, ViewResult> =
  {
    widgetDeclaration: WidgeteriaWidgetDeclaration<
      BaseContext,
      RouteArgs,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >;
    routeArgs: RouteArgs;
  };

type CompiledRoute = {
  regexp: RegExp;
  widgetDeclaration: WidgeteriaWidgetDeclaration<any, any, any, any, any>;
};

function buildRegexp(path: string) {
  const segments = path.split(/:([a-zA-Z\d]+)/);
  const pattern = segments.reduce((acc, cur, idx) => {
    if (idx % 2 === 0) {
      return acc + cur;
    }

    return acc + `(?<id>[a-zA-Z\\d]+)`;
  }, ''); // ?
  return new RegExp('^' + pattern + '$');
}

export class WidgeteriaRouter<BaseContext, WidgetArgs, ViewArgs, ViewResult> {
  readonly #routeList: Array<CompiledRoute> = [];

  register<Path extends string>(
    path: Path,
    widgetDeclaration: WidgeteriaWidgetDeclaration<
      BaseContext,
      ExtractRouteArgs<Path>,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >,
  ): void {
    this.#routeList.push({
      regexp: buildRegexp(path),
      widgetDeclaration,
    });
  }

  parse<RouteArgs>(
    url: string,
  ): WidgeteriaRoute<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs,
    ViewResult
  > | null {
    for (const compiledRoute of this.#routeList) {
      const res = compiledRoute.regexp.exec(url);
      if (!res) {
        continue;
      }

      return {
        widgetDeclaration: compiledRoute.widgetDeclaration,
        routeArgs: res['groups'] as unknown as RouteArgs,
      };
    }

    return null;
  }
}
