import Koa from 'koa';
import Request from 'supertest';
import { createWidgeteriaMiddleware } from './index';
import { ChildWidget } from './fixtures/ChildWidget';
import { WidgeteriaRouter } from '@widgeteria/router';

describe('koa', () => {
  it('base middleware', async () => {
    const app = new Koa();
    const router = new WidgeteriaRouter<Koa.Context, { a: string }, any, any>();
    router.register('/child', ChildWidget);

    app.use(createWidgeteriaMiddleware(router, { a: '123' }));

    const response = await Request(app.callback()).get('/child');

    expect(response.body).toMatchSnapshot();
  });

  it('skip widgeteria if route not found', async () => {
    const app = new Koa();
    const router = new WidgeteriaRouter<Koa.Context, { a: string }, any, any>();
    router.register('/child', ChildWidget);

    app.use(createWidgeteriaMiddleware(router, { a: '123' }));

    const str = 'widgeteria skipped';
    app.use(async (ctx) => {
      ctx.body = str;
    });

    const response = await Request(app.callback()).get('/xxx');

    expect(response.text).toBe(str);
  });
});
