import { createWidgeteriaController, viewArgs } from '@widgeteria/widget';
import * as fs from 'node:fs';
import path from 'path';
import { Context, NavigationWidgetArgs } from './types';

type Structure = Record<string, { path: string; title: string }>;

export const controller = createWidgeteriaController(
  (context: Context, { args }: NavigationWidgetArgs) => {
    const structure: Structure = JSON.parse(
      fs.readFileSync(path.join(args.docsPath, 'nav.json')).toString(),
    );

    const pages = Object.entries(structure).map(([pageUrl, page]) => {
      return {
        url: '/' + pageUrl,
        title: page.title,
      };
    });

    return {
      [viewArgs]: {
        pages,
      },
    };
  },
);
