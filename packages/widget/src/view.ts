export type TriViewArgs<ViewArgs> = {
  args: ViewArgs;
};

export type TriView<ViewArgs, ViewResult> = (
  args: TriViewArgs<ViewArgs>,
) => ViewResult;

export function createTriView<ViewArgs, ViewResult>(
  view: TriView<ViewArgs, ViewResult>,
): TriView<ViewArgs, ViewResult> {
  return view;
}
