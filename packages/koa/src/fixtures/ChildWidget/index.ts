import { declareWidget } from '@drzewo/widget';
import { controller } from './controller';
import { view } from './view';

export const ChildWidget = declareWidget({
  controller,
  view,
});
