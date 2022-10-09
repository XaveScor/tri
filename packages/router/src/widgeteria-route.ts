type ExtractRouteArgs<Path extends string> = string extends Path
  ? unknown
  : Path extends `${infer Start}/:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteArgs<Rest>]: string }
  : Path extends `${infer Start}/:${infer Param}`
  ? { [k in Param]: string }
  : {};

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

export class WidgeteriaRoute<Path extends string> {
  readonly #compiled: RegExp;

  constructor(path: Path) {
    this.#compiled = buildRegexp(path);
  }

  parse(path: string): ExtractRouteArgs<Path> | null {
    const res = this.#compiled.exec(path);

    if (!res) {
      return null;
    }

    return (res.groups ?? {}) as unknown as ExtractRouteArgs<Path>;
  }
}

export type WidgeteriaRouteParams<Route extends WidgeteriaRoute<any>> =
  Route extends WidgeteriaRoute<infer T> ? ExtractRouteArgs<T> : never;
