import { declareWidget } from '@tri/widget';
import { controller } from './controller';
import { view } from './view';

export const ParentWidget = declareWidget({
  controller,
  view,
});
