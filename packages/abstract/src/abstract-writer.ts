export class AbstractWriter {
  constructor() {}

  write() {
    throw new Error('You should redeclare write method');
  }
}
