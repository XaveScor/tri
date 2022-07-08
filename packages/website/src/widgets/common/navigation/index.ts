import { declareWidgeteriaWidget } from '@widgeteria/widget';
import { controller } from './controller';
import { view } from './view';

export const NavigationWidget = declareWidgeteriaWidget({
  controller,
  view,
});
