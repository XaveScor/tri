import { WidgeteriaRouter } from './index';
import { ChildWidget } from './fixtures/ChildWidget';
import { fullPostRoute } from './fixtures/ChildWidget/route';

describe('router', () => {
  it('base', () => {
    const router = new WidgeteriaRouter<{}, string>();
    router.register(fullPostRoute, ChildWidget, { a: 'string' });

    expect(router.parse('/post/xxx/full')).toMatchObject({
      routeArgs: { id: 'xxx' },
      widgetDeclaration: ChildWidget,
    });
  });

  it('null if route not found', () => {
    const router = new WidgeteriaRouter<{}, string>();

    router.register(fullPostRoute, ChildWidget, { a: 'string' });

    expect(router.parse('/post/xxx/ful')).toBeNull();
  });
});
