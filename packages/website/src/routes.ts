import { WidgeteriaRouter } from '@widgeteria/router';
import Koa from 'koa';
import fs from 'node:fs';
import * as path from 'path';
import { MarkdownPageWidget } from './widgets/common/markdown-page';
import { IndexPageWidget } from './widgets/common/index-page';

export const router = new WidgeteriaRouter<Koa.Context, unknown, unknown>();

type Structure = Record<string, { path: string; title: string }>;

const structure: Structure = JSON.parse(
  fs.readFileSync('docs/nav.json').toString(),
);

for (const [pageUrl, page] of Object.entries(structure)) {
  router.register('/' + pageUrl, MarkdownPageWidget, {
    path: path.join('docs', page.path),
  });
}

router.register('/', IndexPageWidget, undefined);
