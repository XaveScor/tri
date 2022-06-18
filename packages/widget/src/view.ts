export type TreeViewArgs<ViewArgs> = {
  args: ViewArgs;
};

export type TriView<ViewArgs, ViewResult> = (
  args: TreeViewArgs<ViewArgs>,
) => ViewResult;
