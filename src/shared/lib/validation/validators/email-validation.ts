import { FieldValidation } from '@/shared/lib/validation/protocols';
import { InvalidFieldError } from '@/shared/lib/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: Record<string, any>): Error | null {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !input[this.field] || emailRegex.test(input[this.field]) ? null : new InvalidFieldError();
  }
}
