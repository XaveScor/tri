import { declareWidgeteriaWidget, isWidgetDeclaration } from './declaration';
import { createWidgeteriaController } from './controller';
import { createWidgeteriaView } from './view';

describe('declaration', function () {
  it('getId', function () {
    const id = 'test id';
    const widgetDeclaration = declareWidgeteriaWidget({
      id,
      controller: createWidgeteriaController(() => ({})),
      view: createWidgeteriaView(() => '1'),
    });

    expect(widgetDeclaration.getId()).toEqual(id);
  });
});

describe('isWidgetDeclaration', function () {
  it('check widget declaration', () => {
    const widgetDeclaration = declareWidgeteriaWidget({
      id: 'test id',
      controller: createWidgeteriaController(() => ({})),
      view: createWidgeteriaView(() => '1'),
    });

    expect(isWidgetDeclaration(widgetDeclaration)).toBeTruthy();
  });

  it('check non widget declaration', () => {
    expect(isWidgetDeclaration(123)).toBeFalsy();
  });
});
