export class WidgeteriaAbstractWriter {
  constructor() {}

  write(chunk: string) {
    throw new Error('You should redeclare write method');
  }
}
