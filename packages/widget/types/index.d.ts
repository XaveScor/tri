import { WidgeteriaContext } from '@widgeteria/context';
import {
  ICreateWidgeteriaController,
  ICreateWidgeteriaView,
  IDeclareWidgeteriaWidget,
  IIsWidgetDeclaration,
  WidgeteriaWidget,
} from './internal';

export {
  WidgeteriaViewArgs,
  viewArgs,
  slotArgs,
  WidgeteriaWidget,
  WidgeteriaWidgetArgs,
} from './internal';

export interface WidgeteriaWidgetDeclaration<
  BaseContext,
  RouteArgs,
  WidgetArgs,
  ViewArgs,
  ViewResult,
> {
  create(
    context: WidgeteriaContext<BaseContext, RouteArgs>,
    args: WidgetArgs,
  ): WidgeteriaWidget<BaseContext, RouteArgs, ViewArgs, ViewResult>;
  getId(): string;
}

export declare const createWidgeteriaView: ICreateWidgeteriaView;

export declare const createWidgeteriaController: ICreateWidgeteriaController;

export declare const declareWidgeteriaWidget: IDeclareWidgeteriaWidget;

export declare const isWidgetDeclaration: IIsWidgetDeclaration;
