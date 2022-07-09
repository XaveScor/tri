import { getEntrypoints } from './index';
import * as path from 'path';
import { WidgeteriaDuplicateWidgetIds } from './get-entrypoints';

describe('build', () => {
  it('get entrypoints', async () => {
    const dirs = [path.join(__dirname, 'fixtures')];
    const pathToChild = path.join(__dirname, 'fixtures', 'ChildWidget');
    const pathToParent = path.join(__dirname, 'fixtures', 'ParentWidget');
    expect(await getEntrypoints(dirs)).toEqual(
      new Map([
        ['child', pathToChild],
        ['parent', pathToParent],
      ]),
    );
  });

  it('duplicated ids', async () => {
    const dirs = [
      path.join(__dirname, 'fixtures'),
      path.join(__dirname, 'duplicatedFixtures'),
    ];
    const pathToChild1 = path.join(__dirname, 'fixtures', 'ChildWidget');
    const pathToChild2 = path.join(
      __dirname,
      'duplicatedFixtures',
      'ChildWidget',
    );
    await expect(() => getEntrypoints(dirs)).rejects.toThrow(
      new WidgeteriaDuplicateWidgetIds('child', pathToChild1, pathToChild2),
    );
  });
});
