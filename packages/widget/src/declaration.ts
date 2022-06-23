import { Widget } from './widget';
import { createChildrenTriContext, TriContext } from '@widgeteria/context';
import { TriController } from './controller';
import { TriView } from './view';

type WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult> = {
  controller: TriController<BaseContext, WidgetArgs, ViewArgs>;
  view: TriView<ViewArgs, ViewResult>;
};

class WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs, ViewResult> {
  #schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult>;

  constructor(
    schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult>,
  ) {
    this.#schema = schema;
  }

  create(
    context: TriContext<BaseContext>,
    args: WidgetArgs,
  ): Widget<BaseContext, ViewArgs, ViewResult> {
    const childContext = createChildrenTriContext(context);
    const widgetArgs = { args };
    const renderSchema = this.#schema.controller(childContext, widgetArgs);
    return new Widget(childContext, renderSchema, this.#schema.view);
  }
}

export type _WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs, ViewResult> =
  WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs, ViewResult>;

export function declareWidget<BaseContext, WidgetArgs, ViewArgs, ViewResult>(
  schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs, ViewResult>,
): WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs, ViewResult> {
  return new WidgetDeclaration(schema);
}
