import { ValidationComposite } from '@/main/composites';
import { ValidationBuilder as Builder } from '@/main/builders';

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('memberId').required().build(),
    ...Builder.field('password').required().min(5).build()
  ]);
