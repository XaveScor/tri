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

    const writer = new (class extends AbstractWriter<void> {
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

  it('test render', (done) => {
    const renderResult = 'test view arg';

    const widgetDeclaration = declareWidget({
      controller: createController(() => {
        return {
          [viewArgs]: renderResult,
        };
      }),
      view: ({ args }) => args,
    });

    const context = createTriContext({});

    const widget = widgetDeclaration.create(context, undefined);

    let res = '';

    const writer = new (class extends AbstractWriter<string> {
      controller() {}

      write(chunk) {
        res += chunk;
      }
    })();

    getTriInnerContext(context).messageBus.subscribe(
      context,
      renderedMessageFactory,
      () => {
        expect(res).toBe(renderResult);
        return done();
      },
    );

    widget.render(writer);
  });
});
