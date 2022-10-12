import { IoCContainer } from './ioc-container';

describe('ioc-container', () => {
  it('singleton', () => {
    const container = new IoCContainer();
    const symbol = Symbol();
    const value = 1;

    container.addSingleton(symbol, value);

    expect(container.get(symbol)).toBe(value);
  });

  it('reset', () => {
    const container = new IoCContainer();
    const symbol = Symbol();
    const value = 1;

    container.addSingleton(symbol, value);
    container.reset();

    expect(container.get(symbol)).toBe(null);
  });
});
