import Koa from 'koa';
import { AbstractWriter } from '@widgeteria/abstract';
import { Readable } from 'stream';

export function createWriter(context: Koa.Context) {
  const stream = new Readable();
  context.body = stream;

  return new (class extends AbstractWriter {
    write(chunk: string) {
      stream.push(chunk);
      stream.push(null);
    }
  })();
}
