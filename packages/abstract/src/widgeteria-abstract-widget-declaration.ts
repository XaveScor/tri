import { WidgeteriaAbstractWidget } from './widgeteria-abstract-widget';
import { WidgeteriaAbstractContext } from './widgeteria-abstract-context';

export class WidgeteriaAbstractWidgetDeclaration<
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewResult,
> {
  create(
    context: WidgeteriaAbstractContext<BaseContext, RouteArgs>,
    args: WidgetArgs,
  ): WidgeteriaAbstractWidget<ViewResult> {
    throw new Error('not implemented');
  }
}
