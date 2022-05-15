import BaseErrorException from './BaseErrorException';
import { CODE_ERROR_SERVER_INTERNAL_ERROR } from './CodeErrors/CodeErrors';

export default class ServerInternalErrorException extends BaseErrorException {
    constructor(stack: string) {
        super(500, [
            {
                code: CODE_ERROR_SERVER_INTERNAL_ERROR.code,
                message: CODE_ERROR_SERVER_INTERNAL_ERROR.message,
                details: stack ? stack.replace('Error: ' + CODE_ERROR_SERVER_INTERNAL_ERROR.message + '\n', '').replace(/^\s+at /, '') : stack,
            },
        ]);
    }
}
