import { WidgeteriaViewArgs, WidgeteriaWidgetArgs } from '@widgeteria/widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaRouteParams } from '../../index';
import { fullPostRoute } from './route';

export type Context = WidgeteriaContext<
  {},
  WidgeteriaRouteParams<typeof fullPostRoute>
>;
export type WidgetArgs = WidgeteriaWidgetArgs<{ a: string }>;
export type ViewArgs = WidgeteriaViewArgs<{ b: string }>;
