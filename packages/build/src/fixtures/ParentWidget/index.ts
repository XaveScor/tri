import { declareWidgeteriaWidget } from '@widgeteria/widget';
import { controller } from './controller';
import { view } from './view';

export const ParentWidget = declareWidgeteriaWidget({
  id: 'parent',
  controller,
  view,
});
