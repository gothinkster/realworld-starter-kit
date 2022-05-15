import BaseErrorException from './BaseErrorException';
import { CODE_ERROR_RESOURCE_NOT_FOUND } from './CodeErrors/CodeErrors';

export default class ResourceNotFoundException extends BaseErrorException {
    constructor(message?: string) {
        super(404, [
            {
                code: CODE_ERROR_RESOURCE_NOT_FOUND.code,
                message: message || CODE_ERROR_RESOURCE_NOT_FOUND.message,
            },
        ]);
    }
}
