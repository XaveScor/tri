import { declareWidget } from '@tri/widget';
import { controller } from './controller';
import { view } from './view';

export const ChildWidget = declareWidget({
  controller,
  view,
});
