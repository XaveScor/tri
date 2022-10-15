import { WidgeteriaWidget, WidgeteriaWidgetClass } from './widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { iocContainer, iocWidget } from '@widgeteria/di';
import { WidgeteriaController } from './controller';
import { WidgeteriaView } from './view';

export type WidgetSchema<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> = {
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
  ): WidgeteriaWidget<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewArgs,
    ViewResult
  > {
    const childContext = context.createChild();
    const widgetClass =
      iocContainer.get<
        WidgeteriaWidgetClass<
          BaseContext,
          RouteArgs,
          WidgetArgs,
          ViewArgs,
          ViewResult
        >
      >(iocWidget);
    return new widgetClass(childContext, args, this.#schema);
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

export const isWidgetDeclaration = (
  x: unknown,
): x is WidgetDeclaration<any, any, any, any, any> => {
  return x instanceof WidgetDeclaration;
};
