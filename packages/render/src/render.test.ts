import { render } from './index';
import { createTriContext } from '@tri/context';
import {
  createTriController,
  declareWidget,
  viewArgs,
  TriViewArgs,
} from '@tri/widget';
import { AbstractRender, AbstractWriter } from '@tri/abstract';

describe('render', () => {
  it('base', async () => {
    type BaseContext = { a: string };

    const controller = createTriController<
      BaseContext,
      { a: string },
      { b: string }
    >((ctx, args) => {
      return {
        [viewArgs]: { b: ctx.a + ' from controller ' + args.args.a },
      };
    });

    const widgetDeclaration = declareWidget({
      controller,
      view: ({ args }: TriViewArgs<{ b: string }>) => args.b,
    });

    const context = createTriContext<BaseContext>({ a: 'base context string' });
    let res = '';
    await render({
      context,
      widgetDeclaration,
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

    expect(res).toBe('base context string from controller from args');
  });
});
