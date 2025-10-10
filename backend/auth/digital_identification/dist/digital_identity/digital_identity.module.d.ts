import { OnModuleInit } from '@nestjs/common';
import { SurrealService } from './db/surreal.service';
export declare class DigitalIdentityModule implements OnModuleInit {
    private readonly surreal;
    constructor(surreal: SurrealService);
    onModuleInit(): Promise<void>;
}
