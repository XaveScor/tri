import {
  WidgeteriaAbstractRender,
  WidgeteriaAbstractWidget,
  WidgeteriaAbstractWidgetDeclaration,
  WidgeteriaAbstractWriter,
} from '@widgeteria/abstract';
import { getMessageBus, WidgeteriaContext } from '@widgeteria/context';
import { splitToChunks } from '@widgeteria/slot';
import { renderCompletedFactory } from './render-completed';

export type RenderArgs<
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> = {
  widgetDeclaration: WidgeteriaAbstractWidgetDeclaration<
    BaseContext,
    RouteArgs,
    WidgetArgs,
    ViewResult
  >;
  args: WidgetArgs;
  writer: WidgeteriaAbstractWriter;
  render: WidgeteriaAbstractRender<ViewResult>;
  context: WidgeteriaContext<BaseContext, RouteArgs>;
};

export async function widgeteriaRender<
  BaseContext extends object,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
>(args: RenderArgs<BaseContext, RouteArgs, WidgetArgs, ViewArgs, ViewResult>) {
  async function _render(widget: WidgeteriaAbstractWidget<ViewResult>) {
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
