import {
  declareWidgeteriaWidget,
  createWidgeteriaController,
  viewArgs,
} from './index';
import { createWidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import { createWidgeteriaView } from './view';

describe('widget', () => {
  it('simple render', async () => {
    const renderResult = 'test view arg';

    const controller = createWidgeteriaController(() => {
      return {
        [viewArgs]: { x: renderResult },
      };
    });
    const widgetDeclaration = declareWidgeteriaWidget({
      controller,
      view: createWidgeteriaView(({ args }) => args.x),
    });

    const context = createWidgeteriaContext({});

    const widget = widgetDeclaration.create(context, undefined);

    const writer = new (class extends WidgeteriaAbstractRender<string> {
      render(str) {
        return str;
      }
    })();

    expect(await widget.render(writer)).toBe(renderResult);
  });
});
