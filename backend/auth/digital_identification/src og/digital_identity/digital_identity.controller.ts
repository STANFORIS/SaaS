// REST endpoints
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
} from '@nestjs/common';
import { DigitalIdentityService } from './digital_identity.service';
import {
  IdentityRegisterRequest,
  IdentityRegisterResponse,
  IdentityLoginRequest,
} from './dto/digital_identity.dto';

@Controller('digital-identity')
// ...imports remain the same
@Controller('digital-identity')
export class DigitalIdentityController {
  constructor(private readonly service: DigitalIdentityService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async register(@Body() body: IdentityRegisterRequest): Promise<IdentityRegisterResponse> {
    try {
      return await this.service.registerIdentity(body);
    } catch (err: any) {
      throw new HttpException(err?.message || 'Registration failed', err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async login(@Body() body: IdentityLoginRequest): Promise<IdentityRegisterResponse> {
    try {
      return await this.service.authenticateUser(body);
    } catch (err: any) {
      throw new HttpException(err?.message || 'Authentication failed', err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify')
  async verify(@Body('token') token: string) {
    try {
      return await this.service.verifyIdentityToken(token);
    } catch (err: any) {
      throw new HttpException('Token verification failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('identity/:id')
  async getIdentityById(@Param('id') id: string) {
    const rec = await this.service.getIdentityById(id);
    if (!rec) throw new HttpException('Identity not found', HttpStatus.NOT_FOUND);
    const safe = { ...rec, auth: undefined, biometrics: undefined };
    return safe;
  }

  @Get('identity/national/:nid')
  async getIdentityByNationalId(@Param('nid') nid: string) {
    const rec = await this.service.getIdentityByNationalId(nid);
    if (!rec) throw new HttpException('Identity not found', HttpStatus.NOT_FOUND);
    const safe = { ...rec, auth: undefined, biometrics: undefined };
    return safe;
  }

  @Patch('identity/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateIdentity(@Param('id') id: string, @Body() updates: Partial<IdentityRegisterRequest>) {
    try {
      const updated = await this.service.updateIdentity(id, updates);
      const safe = { ...updated, auth: undefined, biometrics: undefined };
      return safe;
    } catch (err: any) {
      throw new HttpException(err?.message || 'Update failed', err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('identity/:id/revoke')
  async revokeIdentity(@Param('id') id: string, @Body('reason') reason?: string) {
    try {
      await this.service.revokeIdentity(id, reason);
      return { message: 'Identity revoked' };
    } catch (err: any) {
      throw new HttpException(err?.message || 'Revoke failed', err?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('identities')
  async listIdentities(@Query('page') page = '1', @Query('perPage') perPage = '20') {
    const p = parseInt(page as string, 10) || 1;
    const pp = parseInt(perPage as string, 10) || 20;
    return this.service.listIdentities(p, pp, {});
  }
}
