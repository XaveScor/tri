export {
  declareWidgeteriaWidget,
  isWidgetDeclaration,
  type WidgetDeclaration,
  type WidgetSchema,
} from './declaration';
export {
  createWidgeteriaController,
  viewArgs,
  slotArgs,
  type RenderSchema,
  type WidgeteriaWidgetArgs,
} from './controller';
export {
  createWidgeteriaView,
  type WidgeteriaView,
  type WidgeteriaViewArgs,
} from './view';
export { type WidgeteriaWidget } from './widget';
export { WidgeteriaWindowKey } from './globals';
export { OnlyForClient } from './errors';
