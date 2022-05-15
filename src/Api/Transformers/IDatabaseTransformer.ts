export default interface IDatabaseTransformer<T, E> {
    toEntity(dto: T | T[]): Promise<E | E[]>;

    toDto(dto: T | T[], entity: E | E[]): Promise<T | T[]>;
}
