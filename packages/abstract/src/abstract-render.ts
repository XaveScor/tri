export class AbstractRender<ViewResult> {
  constructor() {}

  render(viewResult: ViewResult): string {
    throw new Error('You should redeclare render method');
  }
}
