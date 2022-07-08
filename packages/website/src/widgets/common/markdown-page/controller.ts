import { createWidgeteriaController, viewArgs } from '@widgeteria/widget';
import * as fs from 'node:fs';
import { marked } from 'marked';
import { Context, NavigationWidgetArgs } from './types';

export const controller = createWidgeteriaController(
  (context: Context, { args }: NavigationWidgetArgs) => {
    const html = marked.parse(fs.readFileSync(args.path).toString());

    return {
      [viewArgs]: {
        html,
      },
    };
  },
);
