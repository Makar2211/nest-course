import { registerDecorator, type ValidationArguments, type ValidationOptions } from "class-validator";

export function StartWith(prefix: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'startWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `The ${args.property} must start with ${prefix}`;
        }
      }
    });
  }
}