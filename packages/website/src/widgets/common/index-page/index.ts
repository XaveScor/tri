import { declareWidgeteriaWidget } from '@widgeteria/widget';
import { controller } from './controller';
import { view } from './view';
import Koa from 'koa';

export const IndexPageWidget = declareWidgeteriaWidget<
  Koa.Context,
  {},
  unknown,
  unknown,
  JSX.Element
>({
  id: 'index-page',
  controller,
  view,
});
