import { NextFunction, Request, Response } from 'express';
import ErrorDetailsDto from '../Dtos/ErrorDetailsDto';
import BaseErrorException from '../Exceptions/BaseErrorException';
import ServerInternalErrorException from '../Exceptions/ServerInternalErrorException';
import ResponseError from '../Responses/ResponseError';

export default async function ErrorMiddleware(baseErrorException: BaseErrorException, req: Request, res: Response, next: NextFunction): Promise<Response> {
    const statusCode: number = baseErrorException.statusCode || 500;

    const responseError = await getResponseError(baseErrorException);

    return res.status(statusCode).send(responseError);
}

async function getResponseError(baseErrorException: BaseErrorException): Promise<ResponseError> {
    const isInstaceOf = baseErrorException instanceof BaseErrorException;

    if (!isInstaceOf && process.env.NODE_ENV === 'development') {
        baseErrorException = new ServerInternalErrorException(String(baseErrorException));
    }

    if (!isInstaceOf && process.env.NODE_ENV === 'development') {
        baseErrorException = new ServerInternalErrorException(undefined);
    }

    const responseError: ResponseError = {
        errors: baseErrorException.errors.map((errorDetails: ErrorDetailsDto) => {
            return {
                code: errorDetails.code,
                message: errorDetails.message,
                details: errorDetails?.details,
            };
        }),
    };

    return responseError;
}
