import { FieldValidation } from '@/shared/lib/validation/protocols';
import { InvalidFieldError } from '@/shared/lib/validation/errors';

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate(input: Record<string, any>): Error | null {
    return input[this.field]?.length < this.minLength ? new InvalidFieldError() : null;
  }
}
