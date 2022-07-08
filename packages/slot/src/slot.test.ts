import { createWidgeteriaSlotSplitString } from './create-split-string';
import { splitToChunks } from './split-to-chunks';

describe('slot', () => {
  it('split to chunks', () => {
    const viewResult = `first${createWidgeteriaSlotSplitString(
      'slotName',
    )}second`;
    const chunks = splitToChunks(viewResult);

    expect(chunks).toStrictEqual([
      { slot: false, view: 'first' },
      { slot: true, name: 'slotName' },
      { slot: false, view: 'second' },
    ]);
  });

  it('split to chunks multiple slots', () => {
    const viewResult = `first${createWidgeteriaSlotSplitString(
      'slotName1',
    )}second${createWidgeteriaSlotSplitString('slotName2')}third`;
    const chunks = splitToChunks(viewResult);

    expect(chunks).toStrictEqual([
      { slot: false, view: 'first' },
      { slot: true, name: 'slotName1' },
      { slot: false, view: 'second' },
      { slot: true, name: 'slotName2' },
      { slot: false, view: 'third' },
    ]);
  });
});
