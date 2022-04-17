import BaseErrorException from './BaseErrorException';
import { CODE_ERROR_ROUTE_NOT_FOUND } from './CodeErrors/CodeErrors';

export default class RouteNoteFoundException extends BaseErrorException {
    constructor() {
        super(404, [CODE_ERROR_ROUTE_NOT_FOUND]);
    }
}
