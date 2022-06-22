import { render } from './index';
import { ChildWidget } from './fixtures/ChildWidget';
import { AbstractRender, AbstractWriter } from '@drzewo/abstract';
import { ParentWidget } from './fixtures/ParentWidget';

describe('render', () => {
  it('base', async () => {
    let res = '';
    await render({
      context: {},
      widgetDeclaration: ChildWidget,
      args: { a: 'from args' },
      writer: new (class extends AbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new (class extends AbstractRender<string> {
        render(chunk: string) {
          return chunk;
        }
      })(),
    });

    expect(res).toMatchSnapshot();
  });

  it('slot', async () => {
    let res = '';
    await render({
      context: {},
      widgetDeclaration: ParentWidget,
      args: { a: 'from args' },
      writer: new (class extends AbstractWriter {
        write(chunk: string) {
          res += chunk;
        }
      })(),
      render: new (class extends AbstractRender<string> {
        render(chunk: string) {
          return chunk;
        }
      })(),
    });

    expect(res).toMatchSnapshot();
  });
});
