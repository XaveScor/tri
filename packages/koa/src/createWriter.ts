import Koa from 'koa';
import { WidgeteriaAbstractWriter } from '@widgeteria/abstract';
import { Readable } from 'stream';

export function createWriter(context: Koa.Context) {
  const stream = new Readable();
  context.body = stream;

  return new (class extends WidgeteriaAbstractWriter {
    write(chunk: string) {
      stream.push(chunk);
      stream.push(null);
    }
  })();
}
