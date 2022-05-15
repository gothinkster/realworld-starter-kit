import BaseErrorException from './BaseErrorException';
import { CODE_ERROR_JSON_MAPPING } from './CodeErrors/CodeErrors';

export default class JsonMappingException extends BaseErrorException {
    constructor() {
        super(400, [CODE_ERROR_JSON_MAPPING]);
    }
}
