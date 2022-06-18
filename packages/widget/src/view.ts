export type RenderViewSchema = unknown;

export type TreeViewArgs<ViewArgs> = {
  args: ViewArgs;
};

export type TriView<ViewArgs> = (
  args: TreeViewArgs<ViewArgs>,
) => RenderViewSchema;
