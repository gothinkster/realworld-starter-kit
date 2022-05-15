import ErrorDetailsDto from '../Dto/ErrorDetailsDto';

export default abstract class BaseErrorException extends Error {
    constructor(statusCode: number, errors: ErrorDetailsDto[]) {
        super(errors ? JSON.stringify(errors) : 'SERVER_INTERNAL_ERROR');
        this.statusCode = statusCode;
        this.errors = errors;
    }

    public statusCode: number;
    public errors: ErrorDetailsDto[];
}
