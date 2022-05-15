import { NextFunction, Request, Response } from 'express';
import BaseErrorException from '../Exception/BaseErrorException';
import ServerInternalErrorException from '../Exception/ServerInternalErrorException';
import ResponseError from '../Response/ResponseError';
import ErrorDetailsDto from '../Dto/ErrorDetailsDto';

const getResponseError = async (statusCode: number, baseErrorException: BaseErrorException, req: Request) => {
    const isInstanceOf = baseErrorException instanceof BaseErrorException;

    if (statusCode >= 500 && process.env.NODE_ENV !== 'development') {
        baseErrorException = new ServerInternalErrorException(undefined);
    }

    if (!isInstanceOf && process.env.NODE_ENV === 'development') {
        baseErrorException = new ServerInternalErrorException(String(baseErrorException));
    }

    if (!isInstanceOf && process.env.NODE_ENV !== 'development') {
        baseErrorException = new ServerInternalErrorException(undefined);
    }

    const responseError: ResponseError = {
        errors: baseErrorException.errors.map((errorDetails: ErrorDetailsDto) => {
            return {
                code: errorDetails.code,
                message: errorDetails.message,
            };
        }),
    };

    return responseError;
};

export default async function errorMiddleware(baseErrorException: BaseErrorException, req: Request, res: Response, next: NextFunction): Promise<void> {
    const statusCode: number = baseErrorException.statusCode || 500;

    const responseError = await getResponseError(statusCode, baseErrorException, req);

    if ([401, 403, 500].indexOf(statusCode) !== -1) {
        res.status(statusCode).send(responseError.errors[0].message);
    } else {
        res.status(statusCode).send(responseError);
    }

    next();
}
