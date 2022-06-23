import {
  WidgeteriaWidgetDeclaration,
  WidgeteriaWidget,
} from '@widgeteria/widget';
import {
  WidgeteriaAbstractRender,
  WidgeteriaAbstractWriter,
} from '@widgeteria/abstract';
import {
  getMessageBus,
  WidgeteriaContext,
} from '@widgeteria/context';
import { splitToChunks } from '@widgeteria/slot';
import { renderCompletedFactory } from './render-completed';

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
  context: WidgeteriaContext<BaseContext>;
};

export async function widgeteriaRender<
  BaseContext,
  WidgetArgs,
  ViewArgs,
  ViewResult,
>(args: RenderArgs<BaseContext, WidgetArgs, ViewArgs, ViewResult>) {
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

  const widget = args.widgetDeclaration.create(args.context, args.args);
  await _render(widget);

  const renderedMessage = renderCompletedFactory.create(args.context);
  getMessageBus(args.context).emit(renderedMessage);
}
