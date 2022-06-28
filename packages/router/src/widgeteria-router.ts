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
    widgetArgs: WidgetArgs;
  };

type CompiledRoute<WidgetArgs> = {
  regexp: RegExp;
  widgetDeclaration: WidgeteriaWidgetDeclaration<
    any,
    any,
    WidgetArgs,
    any,
    any
  >;
  args: WidgetArgs;
};

function buildRegexp(path: string) {
  const segments = path.split(/:([a-zA-Z\d]+)/);
  const pattern = segments.reduce((acc, cur, idx) => {
    if (idx % 2 === 0) {
      return acc + cur;
    }

    return acc + `(?<id>[a-zA-Z\\d]+)`;
  }, '');
  return new RegExp('^' + pattern + '$');
}

export class WidgeteriaRouter<BaseContext, ViewArgs, ViewResult> {
  readonly #routeList: Array<CompiledRoute<any>> = [];

  register<Path extends string, WidgetArgs>(
    path: Path,
    widgetDeclaration: WidgeteriaWidgetDeclaration<
      BaseContext,
      ExtractRouteArgs<Path>,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >,
    args: WidgetArgs,
  ): void {
    this.#routeList.push({
      regexp: buildRegexp(path),
      widgetDeclaration,
      args,
    });
  }

  parse<RouteArgs, WidgetArgs>(
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
        widgetArgs: compiledRoute.args,
      };
    }

    return null;
  }
}
