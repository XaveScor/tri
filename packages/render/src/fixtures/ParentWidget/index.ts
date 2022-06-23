import { declareWidget } from '@widgeteria/widget';
import { controller } from './controller';
import { view } from './view';

export const ParentWidget = declareWidget({
  controller,
  view,
});
