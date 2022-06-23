import Koa from 'koa';
import { WidgeteriaAbstractWriter } from '@widgeteria/abstract';
import { Readable } from 'stream';
import { getMessageBus, WidgeteriaContext } from '@widgeteria/context';
import { renderCompletedFactory } from '@widgeteria/render';

export function createWriter(context: WidgeteriaContext<Koa.Context>) {
  const stream = new Readable();
  context.body = stream;

  getMessageBus(context).subscribe(context, renderCompletedFactory, () => {
    stream.push(null);
  });

  return new (class extends WidgeteriaAbstractWriter {
    write(chunk: string) {
      stream.push(chunk);
    }
  })();
}
