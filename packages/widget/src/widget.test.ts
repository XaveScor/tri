import { declareWidget, createTriController, viewArgs } from './index';
import { createTriContext } from '@tri/context';
import { AbstractRender } from '@tri/abstract';
import { createTriView } from './view';

describe('widget', () => {
  it('simple render', async () => {
    const renderResult = 'test view arg';

    const controller = createTriController(() => {
      return {
        [viewArgs]: { x: renderResult },
      };
    });
    const widgetDeclaration = declareWidget({
      controller,
      view: createTriView(({ args }) => args.x),
    });

    const context = createTriContext({});

    const widget = widgetDeclaration.create(context, undefined);

    const writer = new (class extends AbstractRender<string> {
      render(str) {
        return str;
      }
    })();

    expect(await widget.render(writer)).toBe(renderResult);
  });
});
