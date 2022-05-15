import ErrorDetailsDto from '../../Dto/ErrorDetailsDto';

export const CODE_ERROR_SERVER_INTERNAL_ERROR: ErrorDetailsDto = {
    code: 'SERVER_INTERNAL_ERROR',
    message: 'Internal error in service',
};

export const CODE_ERROR_RESOURCE_NOT_FOUND: ErrorDetailsDto = {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Resource not found',
};

export const CODE_ERROR_RESOURCE_ALREADY_EXISTS: ErrorDetailsDto = {
    code: 'RESOURCE_ALREADY_EXISTS',
    message: 'Resource already exists',
};

export const CODE_ERROR_NOT_FOUND: ErrorDetailsDto = {
    code: 'NOT_FOUND',
    message: 'Route not found',
};

export const CODE_ERROR_JSON_MAPPING: ErrorDetailsDto = {
    code: 'JSON_MAPPING',
    message: 'Incorrect json mapping',
};

export const CODE_ERROR_UNAUTHORIZED: ErrorDetailsDto = {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized',
};

export const CODE_ERROR_FIELDS_INVALID: ErrorDetailsDto = {
    code: 'INVALID_FIELDS',
    message: 'Fields are invalid/required',
};

export const CODE_ERROR_INVALID_CONTENT_TYPE: ErrorDetailsDto = {
    code: 'INVALID_CONTENT_TYPE',
    message: 'Invalid content type',
};

export const CODE_ERROR_INTEGRATION_FAILED: ErrorDetailsDto = {
    code: 'INTEGRATION_FAILED',
    message: 'Integration error with partner',
};
