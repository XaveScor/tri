import { widgeteriaRender } from './index';
import { ChildWidget } from './fixtures/ChildWidget';
import {
  WidgeteriaAbstractRender,
  WidgeteriaAbstractWriter,
} from '@widgeteria/abstract';
import { ParentWidget } from './fixtures/ParentWidget';
import { createWidgeteriaContext } from '@widgeteria/context';
import { iocContainer, iocWidget } from '@widgeteria/di';
import { WidgeteriaServerWidget } from '@widgeteria/widget-server';

describe('render', () => {
  beforeEach(() => {
    iocContainer.reset();
    iocContainer.addSingleton(iocWidget, WidgeteriaServerWidget);
  });

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
      writer: new (class implements WidgeteriaAbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new (class implements WidgeteriaAbstractRender<string> {
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
      writer: new (class implements WidgeteriaAbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new (class implements WidgeteriaAbstractRender<string> {
        render(chunk: string) {
          return chunk;
        }
      })(),
    });

    expect(res).toMatchSnapshot();
  });
});
