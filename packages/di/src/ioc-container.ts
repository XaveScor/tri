export class IoCContainer {
  readonly #singletons = new Map<Symbol, any>();

  addSingleton(key: Symbol, el: unknown) {
    this.#singletons.set(key, el);
  }

  get<T>(key: Symbol): T | null {
    const el = this.#singletons.get(key);

    if (el) {
      return el;
    }

    return null;
  }
}
