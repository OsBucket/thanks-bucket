import { FieldValidation } from '@/main/validation/protocols';
import { RequiredFieldError } from '@/main/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: Record<string, any>): Error | null {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
