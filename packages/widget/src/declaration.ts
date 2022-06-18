import { Widget } from './widget';
import { createChildrenTriContext, TriContext } from '@tri/context';
import { TriController } from './controller';
import { TriView } from './view';

type WidgetSchema<BaseContext, WidgetArgs, ViewArgs> = {
  controller: TriController<BaseContext, WidgetArgs, ViewArgs>;
  view: TriView<ViewArgs>;
};

class WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs> {
  #schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs>;

  constructor(schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs>) {
    this.#schema = schema;
  }

  create(
    context: TriContext<BaseContext>,
    args: WidgetArgs,
  ): Widget<BaseContext, ViewArgs> {
    const childContext = createChildrenTriContext(context);
    const widgetArgs = { args };
    const renderSchema = this.#schema.controller(childContext, widgetArgs);
    return new Widget(childContext, renderSchema);
  }
}

export function declareWidget<BaseContext, WidgetArgs, ViewArgs>(
  schema: WidgetSchema<BaseContext, WidgetArgs, ViewArgs>,
): WidgetDeclaration<BaseContext, WidgetArgs, ViewArgs> {
  return new WidgetDeclaration(schema);
}
