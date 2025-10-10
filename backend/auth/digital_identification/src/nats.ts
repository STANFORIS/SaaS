// src/nats.ts
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, ReadPacket, WritePacket } from '@nestjs/microservices';
import { lastValueFrom, timeout, catchError } from 'rxjs';

@Injectable()
export class NatsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NatsService.name);
  private client!: ClientProxy;  // <-- definite assignment
  private readonly servers: string[];

  private readonly defaultTimeout = 5000; // ms
  private isConnected = false;

  constructor() {
    this.servers = [process.env.NATS_URL || 'nats://localhost:4222'];
  }

  onModuleInit() {
    this.connect();
  }

  onModuleDestroy() {
    this.disconnect();
  }


  /** Initialize NATS connection */
  private connect() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: this.servers,
        queue: process.env.NATS_QUEUE || 'default_queue',
        name: process.env.SERVICE_NAME || 'stanforis_service',
      },
    });

    // Watchdog: check connection
    this.client.connect().then(() => {
      this.isConnected = true;
      this.logger.log(`Connected to NATS: ${this.servers.join(',')}`);
    }).catch(err => {
      this.isConnected = false;
      this.logger.error('Failed to connect to NATS', err);
    });
  }

  /** Disconnect cleanly */
  private async disconnect() {
    if (this.client) {
      await this.client.close();
      this.isConnected = false;
      this.logger.log('Disconnected from NATS');
    }
  }

  /** Publish an event (fire-and-forget) */
  async publish(event: string, payload: any, enablePublish = true): Promise<void> {
    if (!enablePublish) return;
    if (!this.isConnected) {
      this.logger.warn(`NATS not connected, skipping publish for event: ${event}`);
      return;
    }

    try {
      await lastValueFrom(this.client.emit(event, payload).pipe(
        timeout(this.defaultTimeout),
        catchError(err => {
          this.logger.error(`NATS publish error for event ${event}`, err);
          throw err;
        }),
      ));
      this.logger.log(`Published event ${event}`);
    } catch (err) {
      this.logger.error(`Failed to publish event ${event}`, err);
    }
  }

  /** Request-Response (optional) */
  async request<T = any>(pattern: string, payload: any): Promise<T> {
    if (!this.isConnected) throw new Error('NATS not connected');
    return lastValueFrom(this.client.send<T, any>(pattern, payload).pipe(timeout(this.defaultTimeout)));
  }

  /** Health check / watchdog */
  async ping(): Promise<boolean> {
    try {
      await this.request('health_check', { timestamp: Date.now() });
      return true;
    } catch {
      return false;
    }
  }
}
