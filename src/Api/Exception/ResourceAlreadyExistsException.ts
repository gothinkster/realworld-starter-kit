import BaseErrorException from './BaseErrorException';
import ErrorDetailsDto from '../Dto/ErrorDetailsDto';
import { CODE_ERROR_RESOURCE_ALREADY_EXISTS } from './CodeErrors/CodeErrors';

export default class ResourceAlreadyExistsException extends BaseErrorException {
    constructor(messages: string[]) {
        const errors: ErrorDetailsDto[] = messages.map(message => {
            return {
                code: CODE_ERROR_RESOURCE_ALREADY_EXISTS.code,
                message: message || CODE_ERROR_RESOURCE_ALREADY_EXISTS.message,
            };
        });
        super(409, errors);
    }
}
