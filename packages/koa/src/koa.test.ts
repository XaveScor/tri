import Koa from 'koa';
import Request from 'supertest';
import { createWidgeteriaMiddleware } from './index';
import { ChildWidget } from './fixtures/ChildWidget';
import { EmptyWidget } from './fixtures/EmptyWidget';
import { WidgeteriaRouter } from '@widgeteria/router';
import { WidgeteriaReactRender } from '@widgeteria/react';

describe('koa', () => {
  it('base middleware', async () => {
    const app = new Koa();
    const router = new WidgeteriaRouter<Koa.Context, unknown, unknown>();
    router.register('/child', ChildWidget, { a: '123' });

    app.use(
      createWidgeteriaMiddleware(
        EmptyWidget,
        router,
        new WidgeteriaReactRender(),
      ),
    );

    const response = await Request(app.callback()).get('/child');

    expect(response.text).toMatchSnapshot();
  });

  it('content-type must to be a text/html', async () => {
    const app = new Koa();
    const router = new WidgeteriaRouter<Koa.Context, unknown, unknown>();
    router.register('/child', ChildWidget, { a: '123' });

    app.use(
      createWidgeteriaMiddleware(
        EmptyWidget,
        router,
        new WidgeteriaReactRender(),
      ),
    );

    const response = await Request(app.callback()).get('/child');

    expect(response.type).toBe('text/html');
  });

  it('skip widgeteria if route not found', async () => {
    const app = new Koa();
    const router = new WidgeteriaRouter<Koa.Context, unknown, unknown>();
    router.register('/child', ChildWidget, { a: '123' });

    app.use(
      createWidgeteriaMiddleware(
        EmptyWidget,
        router,
        new WidgeteriaReactRender(),
      ),
    );

    const str = 'widgeteria skipped';
    app.use(async (ctx) => {
      ctx.body = str;
    });

    const response = await Request(app.callback()).get('/xxx');

    expect(response.text).toBe(str);
  });
});
