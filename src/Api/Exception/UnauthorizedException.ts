import BaseErrorException from './BaseErrorException';
import { CODE_ERROR_UNAUTHORIZED } from './CodeErrors/CodeErrors';

export default class UnauthorizedException extends BaseErrorException {
    constructor() {
        super(401, [CODE_ERROR_UNAUTHORIZED]);
    }
}
