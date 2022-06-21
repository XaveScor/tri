import { render } from '@tri/render';
import { ChildWidget } from './fixtures/ChildWidget';
import { AbstractWriter } from '@tri/abstract';
import { ReactRender } from './render';
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
      render: new ReactRender(),
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
      render: new ReactRender(),
    });

    expect(res).toMatchSnapshot();
  });
});
