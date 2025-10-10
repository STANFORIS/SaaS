// surreal.service.ts
import { Injectable } from '@nestjs/common';
import Surreal from 'surrealdb';

@Injectable()
export class SurrealService {
  public db!: Surreal; // <- use ! to tell TS it will be assigned

  async init() {
    this.db = new Surreal();
    await this.db.connect(process.env.SURREAL_URL || 'http://127.0.0.1:8000/rpc');
    await this.db.use({
      namespace: process.env.SURREAL_NS || 'stanforis',
      database: process.env.SURREAL_DB || 'digital_identity',
    });
    await this.db.signin({
      username: process.env.SURREAL_USER || 'root',
      password: process.env.SURREAL_PASS || 'root',
    });
    console.log('✅ SurrealDB initialized');
  }
}
