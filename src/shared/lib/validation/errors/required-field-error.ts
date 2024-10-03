export class RequiredFieldError extends Error {
  constructor() {
    super('필수 값입니다');
    this.name = 'RequiredFieldError';
  }
}
