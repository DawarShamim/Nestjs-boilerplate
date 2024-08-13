import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  validationErrors: any;
  constructor(validationErrors: ValidationError[]) {
    const formattedError = ValidationException.formatErrors(validationErrors);
    super(
      { message: 'formValidation', error: formattedError },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.validationErrors = formattedError;
  }
  private static formatErrors(errors: ValidationError[]) {
    const result = [];
    errors.forEach((error) => {
      const contraints = error.constraints;
      const property = error.property;
      result[property] = Object.values(contraints)[0];
    });
    return result;
  }
}
