import {
  declareWidget,
  createController,
  viewArgs,
  renderedMessageFactory,
} from './index';
import { createTriContext, getTriInnerContext } from '@tri/context';
import { AbstractWriter } from '@tri/abstract';

describe('widget', () => {
  it('rendered message sent', (done) => {
    const widgetDeclaration = declareWidget({
      controller: createController(() => {
        return {
          [viewArgs]: 'test view arg',
        };
      }),
      view: ({ args }) => args,
    });

    const context = createTriContext({});

    const widget = widgetDeclaration.create(context, undefined);

    const writer = new (class extends AbstractWriter {
      controller() {}

      write() {}
    })();

    getTriInnerContext(context).messageBus.subscribe(
      context,
      renderedMessageFactory,
      () => done(),
    );

    widget.render(writer);
  });
});
