export class AbstractWriter<ViewResult> {
  constructor() {}

  write(chunk: ViewResult) {
    throw new Error('You should redeclare write method');
  }
}
