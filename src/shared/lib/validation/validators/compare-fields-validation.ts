import { FieldValidation } from '@/shared/lib/validation/protocols';
import { InvalidFieldError } from '@/shared/lib/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: Record<string, any>): Error | null {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null;
  }
}
