import Koa from 'koa';
import Request from 'supertest';
import { createWidgeteriaMiddleware } from './index';
import { ChildWidget } from './fixtures/ChildWidget';

describe('koa', () => {
  it('base middleware', async () => {
    const app = new Koa();

    app.use(createWidgeteriaMiddleware(ChildWidget, { a: '123' }));

    const response = await Request(app.callback()).get('/');

    expect(response.body).toMatchSnapshot();
  });
});
