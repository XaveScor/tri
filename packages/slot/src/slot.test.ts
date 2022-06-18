import { createSlotSplitString } from './create-split-string';
import { splitToChunks } from './split-to-chunks';

describe('slot', () => {
  it('split to chunks', () => {
    const viewResult = `first${createSlotSplitString('slotName')}second`;
    const chunks = splitToChunks(viewResult);

    expect(chunks).toStrictEqual([
      { slot: false, view: 'first' },
      { slot: true, name: 'slotName' },
      { slot: false, view: 'second' },
    ]);
  });
});
