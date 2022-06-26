import Koa from 'koa';
import { WidgeteriaAbstractWriter } from '@widgeteria/abstract';
import { Readable } from 'stream';
import { WidgeteriaContext } from '@widgeteria/context';
import { renderCompletedFactory } from '@widgeteria/render';

export function createWriter(context: WidgeteriaContext<Koa.Context, any>) {
  const stream = new Readable();
  context.getBaseContext().body = stream;

  context.getMessageBus().subscribe(context, renderCompletedFactory, () => {
    stream.push(null);
  });

  return new (class implements WidgeteriaAbstractWriter {
    write(chunk: string) {
      stream.push(chunk);
    }
  })();
}
