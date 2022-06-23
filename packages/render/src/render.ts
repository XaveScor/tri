import { WidgetDeclaration } from '@widgeteria/widget';
import { AbstractRender, AbstractWriter } from '@widgeteria/abstract';
import { createTriContext } from '@widgeteria/context';
import { splitToChunks } from '@widgeteria/slot';
import { Widget } from '@widgeteria/widget/src/widget';

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

  async function _render<_BaseContext, _ViewArgs>(
    widget: Widget<_BaseContext, _ViewArgs, ViewResult>,
  ) {
    const res = await widget.render(args.render);
    const chunks = splitToChunks(res);
    for (const chunk of chunks) {
      if (chunk.slot === false) {
        args.writer.write(chunk.view);
        continue;
      }
      await _render(widget.getSlotRenderSchema(chunk.name));
    }
  }

  const widget = args.widgetDeclaration.create(context, args.args);
  await _render(widget);
}
