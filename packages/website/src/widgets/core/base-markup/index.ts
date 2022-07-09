import { declareWidgeteriaWidget } from '@widgeteria/widget';
import { controller } from './controller';
import { view } from './view';

export const BaseMarkupWidget = declareWidgeteriaWidget({
  id: 'base-markup',
  controller,
  view,
});
