import * as fs from 'node:fs';
import { isWidgetDeclaration } from '@widgeteria/widget';
import * as path from 'path';

type Id = string;
type Path = string;

export class WidgeteriaDuplicateWidgetIds extends Error {
  constructor(widgetId: string, firstPath: string, secondPath: string) {
    super(
      `Widgets has the same id: ${widgetId}.\nPath1: ${firstPath}.\nPath2: ${secondPath}`,
    );
  }
}

export async function getEntrypoints(dirs: ReadonlyArray<string>) {
  const ret = new Map<Id, Path>();

  for (const dir of dirs) {
    const dirData = fs.readdirSync(dir);
    for (const widgetDir of dirData) {
      const widgetPath = path.join(dir, widgetDir);
      const widgetImports = await import(widgetPath);
      for (const [_, value] of Object.entries(widgetImports)) {
        if (isWidgetDeclaration(value)) {
          const id = value.getId();
          if (ret.has(id)) {
            throw new WidgeteriaDuplicateWidgetIds(id, ret.get(id), widgetPath);
          }
          ret.set(id, widgetPath);
        }
      }
    }
  }

  return ret;
}
