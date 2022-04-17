import ErrorDetailsDto from '../../Dtos/ErrorDetailsDto';

export const CODE_ERROR_ROUTE_NOT_FOUND: ErrorDetailsDto = {
    code: 'ROUTE_NOT_FOUND',
    message: 'Route not found',
};

export const CODE_ERROR_SERVER_INTERNAL_ERROR: ErrorDetailsDto = {
    code: 'SERVER_INTERNAL_ERROR',
    message: 'Internal error in service',
};
