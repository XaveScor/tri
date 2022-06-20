import { WidgetDeclaration } from '@tri/widget';
import { AbstractRender, AbstractWriter } from '@tri/abstract';
import { createTriContext } from '@tri/context';
import { splitToChunks } from '@tri/slot';

export type RenderArgs<BaseContext, WidgetArgs, ViewArgs, ViewResult> = {
  widgetDeclaration: WidgetDeclaration<
    BaseContext,
    WidgetArgs,
    ViewArgs,
    ViewResult
  >;
  args: WidgetArgs;
  writer: AbstractWriter;
  render: AbstractRender<ViewResult>;
  context: BaseContext;
};

export async function render<BaseContext, WidgetArgs, ViewArgs, ViewResult>(
  args: RenderArgs<BaseContext, WidgetArgs, ViewArgs, ViewResult>,
) {
  const context = createTriContext(args.context);

  const widget = args.widgetDeclaration.create(context, args.args);
  const res = await widget.render(args.render);
  const chunks = splitToChunks(res);
  for (const chunk of chunks) {
    if (chunk.slot === false) {
      args.writer.write(chunk.view);
      continue;
    }
    throw new Error('Slots not supported right now');
  }
}
