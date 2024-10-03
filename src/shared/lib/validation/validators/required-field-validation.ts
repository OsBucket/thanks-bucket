import { FieldValidation } from '@/shared/lib/validation/protocols';
import { RequiredFieldError } from '@/shared/lib/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: Record<string, any>): Error | null {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
