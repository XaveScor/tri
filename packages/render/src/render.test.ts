import { widgeteriaRender } from './index';
import { ChildWidget } from './fixtures/ChildWidget';
import {
  WidgeteriaAbstractRender,
  WidgeteriaAbstractWriter,
} from '@widgeteria/abstract';
import { ParentWidget } from './fixtures/ParentWidget';
import { createWidgeteriaContext } from '@widgeteria/context';

describe('render', () => {
  it('base', async () => {
    let res = '';
    const context = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });
    await widgeteriaRender({
      context,
      widgetDeclaration: ChildWidget,
      args: { a: 'from args' },
      writer: new (class extends WidgeteriaAbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new (class extends WidgeteriaAbstractRender<string> {
        render(chunk: string) {
          return chunk;
        }
      })(),
    });

    expect(res).toMatchSnapshot();
  });

  it('slot', async () => {
    let res = '';
    const context = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });
    await widgeteriaRender({
      context,
      widgetDeclaration: ParentWidget,
      args: { a: 'from args' },
      writer: new (class extends WidgeteriaAbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new (class extends WidgeteriaAbstractRender<string> {
        render(chunk: string) {
          return chunk;
        }
      })(),
    });

    expect(res).toMatchSnapshot();
  });
});
