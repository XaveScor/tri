import { Widget } from './widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaController } from './controller';
import { WidgeteriaView } from './view';

type WidgetSchema<BaseContext, RouteArgs, WidgetArgs, ViewArgs, ViewResult> = {
  id: string;
  controller: WidgeteriaController<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs
  >;
  view: WidgeteriaView<ViewArgs, ViewResult>;
};

export class WidgetDeclaration<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
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
    this.#schema = schema;
  }

  create(
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    args: WidgetArgs,
  ): Widget<BaseContext, RouteArgs, ViewArgs, ViewResult> {
    const childContext = context.createChild();
    const widgetArgs = { args };
    const renderSchema = this.#schema.controller(childContext, widgetArgs);
    return new Widget(childContext, renderSchema, this.#schema.view);
  }

  getId() {
    return this.#schema.id;
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

export function isWidgetDeclaration(
  x: unknown,
): x is WidgetDeclaration<any, any, any, any, any> {
  return x instanceof WidgetDeclaration;
}
