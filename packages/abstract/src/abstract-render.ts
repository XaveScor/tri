export class AbstractRender {
  constructor() {
    throw new Error('You cannot create AbstractRender directly');
  }

  render() {
    throw new Error('You should redeclare render method');
  }
}
