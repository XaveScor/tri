import { WidgeteriaAbstractRender } from './widgeteria-abstract-render';

export class WidgeteriaAbstractWidget<ViewResult> {
  async render(render: WidgeteriaAbstractRender<ViewResult>): Promise<string> {
    throw new Error('not implemented');
  }

  getSlotRenderSchema(name: string): WidgeteriaAbstractWidget<any> {
    throw new Error('not implemented');
  }
}
