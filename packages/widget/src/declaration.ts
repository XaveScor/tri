import { Widget } from './widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaWidgetDeclaration as IWidgeteriaWidgetDeclaration } from '../types';
import {
  IDeclareWidgeteriaWidget,
  IIsWidgetDeclaration,
  WidgetSchema,
} from '../types/internal';

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
    const widgetArgs = { args };
    const renderSchema = this.#schema.controller(childContext, widgetArgs);
    return new Widget(childContext, renderSchema, this.#schema.view);
  }

  getId() {
    return this.#schema.id;
  }
}

export const declareWidgeteriaWidget: IDeclareWidgeteriaWidget = (schema) =>
  new WidgetDeclaration(schema);

export const isWidgetDeclaration: IIsWidgetDeclaration = (
  x: unknown,
): x is WidgetDeclaration<any, any, any, any, any> => {
  return x instanceof WidgetDeclaration;
};
