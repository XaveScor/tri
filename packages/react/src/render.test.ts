import { widgeteriaRender } from '@widgeteria/render';
import { ChildWidget } from './fixtures/ChildWidget';
import { WidgeteriaAbstractWriter } from '@widgeteria/abstract';
import { WidgeteriaReactRender } from './render';
import { ParentWidget } from './fixtures/ParentWidget';

describe('render', () => {
  it('base', async () => {
    let res = '';
    await widgeteriaRender({
      context: {},
      widgetDeclaration: ChildWidget,
      args: { a: 'from args' },
      writer: new (class extends WidgeteriaAbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new WidgeteriaReactRender(),
    });

    expect(res).toMatchSnapshot();
  });

  it('slot', async () => {
    let res = '';
    await widgeteriaRender({
      context: {},
      widgetDeclaration: ParentWidget,
      args: { a: 'from args' },
      writer: new (class extends WidgeteriaAbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new WidgeteriaReactRender(),
    });

    expect(res).toMatchSnapshot();
  });
});
