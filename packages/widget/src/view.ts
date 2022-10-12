export type WidgeteriaViewArgs<ViewArgs> = {
  args: ViewArgs;
};

export type WidgeteriaView<ViewArgs, ViewResult> = (
  args: WidgeteriaViewArgs<ViewArgs>,
) => ViewResult;

export function createWidgeteriaView<ViewArgs, ViewResult>(
  view: WidgeteriaView<ViewArgs, ViewResult>,
) {
  return view;
}
