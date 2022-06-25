import { Widget } from './widget';
import {
  createChildrenWidgeteriaContext,
  WidgeteriaContext,
} from '@widgeteria/context';
import { WidgeteriaController } from './controller';
import { WidgeteriaView } from './view';
import { WidgeteriaAbstractWidgetDeclaration } from '@widgeteria/abstract/src/widgeteria-abstract-widget-declaration';

type WidgetSchema<
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> = {
  controller: WidgeteriaController<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs
  >;
  view: WidgeteriaView<ViewArgs, ViewResult>;
};

class WidgetDeclaration<
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> extends WidgeteriaAbstractWidgetDeclaration<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewResult
> {
  #schema: WidgetSchema<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs,
    ViewResult
  >;

  constructor(
    schema: WidgetSchema<
      BaseContext,
      RouteArgs,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >,
  ) {
    super();
    this.#schema = schema;
  }

  create(
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    args: WidgetArgs,
  ): Widget<BaseContext, RouteArgs, ViewArgs, ViewResult> {
    const childContext = createChildrenWidgeteriaContext(context);
    const widgetArgs = { args };
    const renderSchema = this.#schema.controller(childContext, widgetArgs);
    return new Widget(childContext, renderSchema, this.#schema.view);
  }
}

export function declareWidgeteriaWidget<
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
>(
  schema: WidgetSchema<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs,
    ViewResult
  >,
): WidgetDeclaration<BaseContext, RouteArgs, WidgetArgs, ViewArgs, ViewResult> {
  return new WidgetDeclaration(schema);
}
