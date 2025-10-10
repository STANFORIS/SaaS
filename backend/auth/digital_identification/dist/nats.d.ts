import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class NatsService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private client;
    private readonly servers;
    private readonly defaultTimeout;
    private isConnected;
    constructor();
    onModuleInit(): void;
    onModuleDestroy(): void;
    private connect;
    private disconnect;
    publish(event: string, payload: any, enablePublish?: boolean): Promise<void>;
    request<T = any>(pattern: string, payload: any): Promise<T>;
    ping(): Promise<boolean>;
}
