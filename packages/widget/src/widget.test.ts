import { declareWidget, createController, viewArgs } from './index';
import { createTriContext } from '@tri/context';
import { AbstractRender } from '@tri/abstract/src/abstract-render';

describe('widget', () => {
  it('simple render', async () => {
    const renderResult = 'test view arg';

    const widgetDeclaration = declareWidget({
      controller: createController(() => {
        return {
          [viewArgs]: renderResult,
        };
      }),
      view: ({ args }) => args,
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
