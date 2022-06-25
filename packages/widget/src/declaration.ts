import { Widget } from './widget';
import {
  createChildrenWidgeteriaContext,
  WidgeteriaContext,
} from '@widgeteria/context';
import { WidgeteriaController } from './controller';
import { WidgeteriaView } from './view';
import { WidgeteriaAbstractWidgetDeclaration } from '@widgeteria/abstract/src/widgeteria-abstract-widget-declaration';

type WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult> = {
  controller: WidgeteriaController<BaseContext, WidgetArgs, ViewArgs>;
  view: WidgeteriaView<ViewArgs, ViewResult>;
};

class WidgetDeclaration<
  BaseContext extends object,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> extends WidgeteriaAbstractWidgetDeclaration<
  BaseContext,
  WidgetArgs,
  ViewResult
> {
  #schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult>;

  constructor(
    schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult>,
  ) {
    super();
    this.#schema = schema;
  }

  create(
    context: WidgeteriaContext<BaseContext>,
    args: WidgetArgs,
  ): Widget<BaseContext, ViewArgs, ViewResult> {
    const childContext = createChildrenWidgeteriaContext(context);
    const widgetArgs = { args };
    const renderSchema = this.#schema.controller(childContext, widgetArgs);
    return new Widget(childContext, renderSchema, this.#schema.view);
  }
}

export function declareWidgeteriaWidget<
  BaseContext extends object,
  WidgetArgs,
  ViewArgs,
  ViewResult,
>(
  schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult>,
): WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs, ViewResult> {
  return new WidgetDeclaration(schema);
}
