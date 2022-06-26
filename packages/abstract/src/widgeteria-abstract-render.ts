export interface WidgeteriaAbstractRender<ViewResult> {
  render(viewResult: ViewResult): string;
}
