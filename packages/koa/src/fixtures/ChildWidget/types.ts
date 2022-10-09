import { WidgeteriaViewArgs, WidgeteriaWidgetArgs } from '@widgeteria/widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaRouteParams } from '@widgeteria/router/src/widgeteria-route';
import Koa from 'koa';
import { childRoute } from './route';

export type Context = WidgeteriaContext<
  Koa.Context,
  WidgeteriaRouteParams<typeof childRoute>
>;
export type WidgetArgs = WidgeteriaWidgetArgs<{ a: string }>;
export type ViewArgs = WidgeteriaViewArgs<{ b: string }>;
