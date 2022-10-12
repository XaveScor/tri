import { Widget } from './widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaWidgetDeclaration as IWidgeteriaWidgetDeclaration } from '../types';
import { WidgeteriaController, WidgeteriaView } from '../types/internal';
import { iocContainer } from '@widgeteria/di';
import { IoCWidgetSymbol } from './const';

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
> implements
    IWidgeteriaWidgetDeclaration<
      BaseContext,
      RouteArgs,
      WidgetArgs,
      ViewArgs,
      ViewResult
    >
{
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
    const widget = iocContainer.get(IoCWidgetSymbol);
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

export const isWidgetDeclaration = (
  x: unknown,
): x is WidgetDeclaration<any, any, any, any, any> => {
  return x instanceof WidgetDeclaration;
};
