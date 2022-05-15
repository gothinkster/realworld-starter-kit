export interface IRepository<T> {
    save(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

    delete(uuid: string): Promise<void>;

    findByUuid(uuid: string): Promise<T>;

    findAll(page?: number, pageSize?: number): Promise<T[]>;
}
