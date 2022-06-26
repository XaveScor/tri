import { WidgeteriaViewArgs, WidgeteriaWidgetArgs } from '@widgeteria/widget';
import { WidgeteriaContext } from '@widgeteria/context';

export type Context = WidgeteriaContext<{}, { id: string }>;
export type WidgetArgs = WidgeteriaWidgetArgs<{ a: string }>;
export type ViewArgs = WidgeteriaViewArgs<{ b: string }>;
