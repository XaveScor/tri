import { createWidgeteriaContext } from '@widgeteria/context';
import { WidgeteriaAbstractRender } from '@widgeteria/abstract';
import {
  createWidgeteriaController,
  createWidgeteriaView,
  declareWidgeteriaWidget,
  viewArgs,
} from '@widgeteria/widget/src';
import { iocContainer, iocWidget } from '@widgeteria/di';
import { WidgeteriaServerWidget } from './index';

describe('server widget', () => {
  beforeEach(() => {
    iocContainer.reset();
    iocContainer.addSingleton(iocWidget, WidgeteriaServerWidget);
  });

  it('simple render', async () => {
    const renderResult = 'test view arg';

    const controller = createWidgeteriaController(() => {
      return {
        [viewArgs]: { x: renderResult },
      };
    });
    const widgetDeclaration = declareWidgeteriaWidget({
      id: 'id',
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
      id: 'id',
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
