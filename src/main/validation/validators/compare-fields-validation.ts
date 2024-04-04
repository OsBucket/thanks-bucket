import { FieldValidation } from '@/main/validation/protocols';
import { InvalidFieldError } from '@/main/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: Record<string, any>): Error | null {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null;
  }
}
