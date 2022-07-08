import { WidgeteriaContext } from '@widgeteria/context';
import Koa from 'koa';
import { WidgeteriaViewArgs, WidgeteriaWidgetArgs } from '@widgeteria/widget';

export type Context = WidgeteriaContext<Koa.Context, unknown>;
export type NavigationWidgetArgs = WidgeteriaWidgetArgs<{
  docsPath: string;
}>;
export type ViewArgs = WidgeteriaViewArgs<{
  pages: ReadonlyArray<{
    title: string;
    url: string;
  }>;
}>;
