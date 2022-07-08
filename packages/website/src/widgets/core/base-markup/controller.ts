import {
  createWidgeteriaController,
  slotArgs,
  viewArgs,
  WidgeteriaWidgetArgs,
} from '@widgeteria/widget';
import { WidgeteriaContext } from '@widgeteria/context';
import { BaseWidgetDescription } from '@widgeteria/koa';
import Koa from 'koa';
import { NavigationWidget } from '../../common/navigation';

export const controller = createWidgeteriaController(
  (
    context: WidgeteriaContext<Koa.Context, unknown>,
    { args }: WidgeteriaWidgetArgs<BaseWidgetDescription>,
  ) => {
    return {
      [viewArgs]: {},
      [slotArgs]: {
        navigation: NavigationWidget.create(context, { docsPath: 'docs' }),
        content: args.widgetDeclaration.create(context, args.args),
      },
    };
  },
);
