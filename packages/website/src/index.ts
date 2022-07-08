import { createWidgeteriaMiddleware } from '@widgeteria/koa';
import Koa from 'koa';
import { WidgeteriaReactRender } from '@widgeteria/react';
import { router } from './routes';
import { BaseMarkupWidget } from './widgets/core/base-markup';

const app = new Koa();
app.use(
  createWidgeteriaMiddleware(
    BaseMarkupWidget,
    router,
    new WidgeteriaReactRender(),
  ),
);
app.listen(8080);
console.log('website started on http://localhost:8080');
