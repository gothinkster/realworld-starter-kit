import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validate, ValidationError } from 'class-validator';
import ErrorDetailsDto from '../Dto/ErrorDetailsDto';
import { CODE_ERROR_FIELDS_INVALID } from '../Exception/CodeErrors/CodeErrors';
import { InvalidFieldsException } from '../Exception/InvalidFieldsException';

export default class ClassValidator {
    public static transformerToModel<T>(classType: ClassConstructor<T>, requestObject: any | any[]): Promise<T> {
        return Promise.resolve(plainToClass(classType, requestObject, { excludeExtraneousValues: true }));
    }

    public static async validateInput<T extends object>(requestObject: T): Promise<void> {
        const validationErrors: ValidationError[] = await validate(requestObject);

        if (validationErrors && validationErrors.length) {
            const errorDetails = this.mappingValidationError(validationErrors);
            throw new InvalidFieldsException(errorDetails);
        }
    }

    private static mappingValidationError(validationErrors: ValidationError[], property?: string): ErrorDetailsDto[] {
        let errorDetailsDto: ErrorDetailsDto[] = [];

        for (const item of validationErrors) {
            if (!item.constraints && item.children.length > 0) {
                errorDetailsDto = [...errorDetailsDto, ...this.mappingValidationError(item.children, item.property)];
                continue;
            }

            errorDetailsDto.push({
                code: CODE_ERROR_FIELDS_INVALID.code,
                message: Object.values(item.constraints)
                    .map((el: string) => {
                        return (property ? property + '.' : '') + el;
                    })
                    .join(', '),
            });
        }

        return errorDetailsDto;
    }
}
