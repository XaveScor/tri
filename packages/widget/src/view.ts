export type TriViewArgs<ViewArgs> = {
  args: ViewArgs;
};

export type TriView<ViewArgs, ViewResult> = (
  args: TriViewArgs<ViewArgs>,
) => ViewResult;
