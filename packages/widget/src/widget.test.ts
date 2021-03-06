import {
  declareWidgeteriaWidget,
  createWidgeteriaController,
  viewArgs,
} from './index';
import { createWidgeteriaContext } from '@widgeteria/context';
import { createWidgeteriaView } from './view';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';

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

    const context = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });

    const widget = widgetDeclaration.create(context, undefined);

    const writer = new (class implements WidgeteriaAbstractRender<string> {
      render(str) {
        return str;
      }
    })();

    expect(await widget.render(writer)).toBe(renderResult);
  });

  it('render without viewArgs', async () => {
    const renderResult = '123';

    const controller = createWidgeteriaController(() => ({}));
    const widgetDeclaration = declareWidgeteriaWidget({
      controller,
      view: createWidgeteriaView(() => renderResult),
    });

    const context = createWidgeteriaContext({
      baseContext: {},
      routeArgs: {},
    });

    const widget = widgetDeclaration.create(context, undefined);

    const writer = new (class implements WidgeteriaAbstractRender<string> {
      render(str) {
        return str;
      }
    })();

    expect(await widget.render(writer)).toBe(renderResult);
  });
});
