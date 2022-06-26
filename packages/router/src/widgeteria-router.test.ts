import { WidgeteriaRouter } from './index';
import { ChildWidget } from './fixtures/ChildWidget';

describe('router', () => {
  it('base', () => {
    const router = new WidgeteriaRouter();
    router.register('/post/:id/full', ChildWidget);

    expect(router.parse('/post/xxx/full')).toMatchObject({
      routeArgs: { id: 'xxx' },
      widgetDeclaration: ChildWidget,
    });
  });

  it('null if route not found', () => {
    const router = new WidgeteriaRouter();
    router.register('/post/:id/full', ChildWidget);

    expect(router.parse('/post/xxx/ful')).toBeNull();
  });
});
