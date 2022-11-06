export class OnlyForClient extends Error {
  constructor(methodName: string) {
    super(`${methodName} supported only for client`);
  }
}

export class OnlyForServer extends Error {
  constructor(methodName: string) {
    super(`${methodName} supported only for server`);
  }
}
