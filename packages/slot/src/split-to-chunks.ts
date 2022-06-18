export type RenderChunks = ReadonlyArray<
  | {
      slot: true;
      name: string;
    }
  | {
      slot: false;
      view: string;
    }
>;

function makeSlotResult(data: string) {
  return {
    slot: true,
    name: data,
  } as const;
}

function makeViewResult(data: string) {
  return {
    slot: false,
    view: data,
  } as const;
}

export function splitToChunks(viewResult: string): RenderChunks {
  return viewResult
    .split(/\u00A9\u00A9\u00A9(.+)\u00A9\u00A9\u00A9/)
    .map((str, idx) =>
      idx % 2 === 1 ? makeSlotResult(str) : makeViewResult(str),
    );
}
