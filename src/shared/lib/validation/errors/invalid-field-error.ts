export class InvalidFieldError extends Error {
  constructor() {
    super('잘못된 값입니다');
  }
}
