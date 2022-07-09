import { declareWidgeteriaWidget } from '@widgeteria/widget';
import { controller } from './controller';
import { view } from './view';

export const EmptyWidget = declareWidgeteriaWidget({
  id: 'empty',
  controller,
  view,
});
