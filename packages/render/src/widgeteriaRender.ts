import {
  WidgeteriaWidgetDeclaration,
  WidgeteriaWidget,
} from '@widgeteria/widget';
import {
  WidgeteriaAbstractRender,
  WidgeteriaAbstractWriter,
} from '@widgeteria/abstract';
import { createWidgeteriaContext } from '@widgeteria/context';
import { splitToChunks } from '@widgeteria/slot';

export type RenderArgs<BaseContext, WidgetArgs, ViewArgs, ViewResult> = {
  widgetDeclaration: WidgeteriaWidgetDeclaration<
    BaseContext,
    WidgetArgs,
    ViewArgs,
    ViewResult
  >;
  args: WidgetArgs;
  writer: WidgeteriaAbstractWriter;
  render: WidgeteriaAbstractRender<ViewResult>;
  context: BaseContext;
};

export async function widgeteriaRender<
  BaseContext,
  WidgetArgs,
  ViewArgs,
  ViewResult,
>(args: RenderArgs<BaseContext, WidgetArgs, ViewArgs, ViewResult>) {
  const context = createWidgeteriaContext(args.context);

  async function _render<_BaseContext, _ViewArgs>(
    widget: WidgeteriaWidget<_BaseContext, _ViewArgs, ViewResult>,
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
