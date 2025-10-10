import Surreal from 'surrealdb';
export declare class SurrealService {
    db: Surreal;
    init(): Promise<void>;
}
