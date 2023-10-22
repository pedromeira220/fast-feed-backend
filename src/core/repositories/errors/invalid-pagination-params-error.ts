export class InvalidPaginationParamsError extends Error {
  constructor() {
    super('Invalid pagination params')
  }
}
