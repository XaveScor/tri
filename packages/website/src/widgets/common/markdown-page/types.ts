import { WidgeteriaContext } from '@widgeteria/context';
import Koa from 'koa';
import { WidgeteriaViewArgs, WidgeteriaWidgetArgs } from '@widgeteria/widget';

export type Context = WidgeteriaContext<Koa.Context, unknown>;
export type NavigationWidgetArgs = WidgeteriaWidgetArgs<{
  path: string;
}>;
export type ViewArgs = WidgeteriaViewArgs<{
  html: string;
}>;
