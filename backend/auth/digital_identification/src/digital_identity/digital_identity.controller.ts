// src/digital_identity/digital_identity.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { DigitalIdentityService } from './digital_identity.service';
import {
  IdentityRegisterRequest,
  IdentityRegisterResponse,
  IdentityLoginRequest,
} from './dto/digital_identity.dto';
import { ErrorCode } from './dto/enums';

@Controller('digital-identity')
export class DigitalIdentityController {
  private readonly logger = new Logger(DigitalIdentityController.name);

  constructor(private readonly service: DigitalIdentityService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async register(@Body() body: IdentityRegisterRequest): Promise<IdentityRegisterResponse> {
    try {
      return await this.service.registerIdentity(body);
    } catch (err: any) {
      this.logger.error('Registration failed', err);
      throw new HttpException(err?.message || ErrorCode.INTERNAL_SERVER_ERROR, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async login(@Body() body: IdentityLoginRequest): Promise<IdentityRegisterResponse> {
    try {
      return await this.service.authenticateUser(body);
    } catch (err: any) {
      this.logger.error('Login failed', err);
      throw new HttpException(err?.message || ErrorCode.AUTHENTICATION_FAILED, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify')
  async verify(@Body('token') token: string) {
    try {
      return await this.service.verifyIdentityToken(token);
    } catch (err: any) {
      this.logger.error('Token verification failed', err);
      throw new HttpException(ErrorCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('identity/:id')
  async getIdentityById(@Param('id') id: string) {
    try {
      const rec = await this.service.getIdentityById(id);
      if (!rec) throw new HttpException(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      const safe = { ...rec, auth: undefined, biometrics: undefined };
      return safe;
    } catch (err: any) {
      this.logger.error(`Get identity by ID failed for ${id}`, err);
      throw new HttpException(err?.message || ErrorCode.INTERNAL_SERVER_ERROR, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('identity/national/:nid')
  async getIdentityByNationalId(@Param('nid') nid: string) {
    try {
      const rec = await this.service.getIdentityByNationalId(nid);
      if (!rec) throw new HttpException(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      const safe = { ...rec, auth: undefined, biometrics: undefined };
      return safe;
    } catch (err: any) {
      this.logger.error(`Get identity by National ID failed for ${nid}`, err);
      throw new HttpException(err?.message || ErrorCode.INTERNAL_SERVER_ERROR, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('identity/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateIdentity(@Param('id') id: string, @Body() updates: Partial<IdentityRegisterRequest>) {
    try {
      const updated = await this.service.updateIdentity(id, updates);
      const safe = { ...updated, auth: undefined, biometrics: undefined };
      return safe;
    } catch (err: any) {
      this.logger.error(`Update identity failed for ${id}`, err);
      throw new HttpException(err?.message || ErrorCode.INTERNAL_SERVER_ERROR, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('identity/:id/revoke')
  async revokeIdentity(@Param('id') id: string, @Body('reason') reason?: string) {
    try {
      await this.service.revokeIdentity(id, reason);
      return { message: 'Identity revoked' };
    } catch (err: any) {
      this.logger.error(`Revoke identity failed for ${id}`, err);
      throw new HttpException(err?.message || ErrorCode.INTERNAL_SERVER_ERROR, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('identities')
  async listIdentities(@Query('page') page = '1', @Query('perPage') perPage = '20') {
    try {
      const p = parseInt(page as string, 10) || 1;
      const pp = parseInt(perPage as string, 10) || 20;
      return this.service.listIdentities(p, pp, {});
    } catch (err: any) {
      this.logger.error('List identities failed', err);
      throw new HttpException(err?.message || ErrorCode.INTERNAL_SERVER_ERROR, err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
