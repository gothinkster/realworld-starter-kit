export default interface IApiTransformer<T, R> {
    fromApi(object: any | any[], headers?: any): Promise<T | T[]>;

    toApi(dto: T | T[]): Promise<R | R[]>;
}
