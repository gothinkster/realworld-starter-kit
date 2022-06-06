import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Account } from '../../domain/profiles/models'
import { ProfilesService } from '../../domain/profiles/service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  cloneProfileToOutput,
  CreateProfileDTO,
  ProfileResponseDTO,
  UpdateProfileDTO,
} from '../parsing/profiles.dto'
import { AuthIsOptional, JWTAuthGuard } from '../security/jwt.guard'
import { validateModel } from '../validation/validation.utils'

@ApiTags('profiles')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private service: ProfilesService) {}

  @Get('me')
  async getCurrent(
    @InjectAccount() account: Account,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.getByAccount(account)
    return {
      profile: cloneProfileToOutput(me, account.email),
    }
  }

  @Post()
  async create(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.createForAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me, account.email),
    }
  }

  @Put()
  async update(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.updateByAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me, account.email),
    }
  }

  @Patch()
  async partialUpdate(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: UpdateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.updateByAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me, account.email),
    }
  }

  @Post(':username/follow')
  async followProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.getByAccount(account)
    const user = await this.service.getByUsername(username)
    await me.follow(user)
    return {
      profile: cloneProfileToOutput(user, account.email, true),
    }
  }

  @Delete(':username/follow')
  async unfollowProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.getByAccount(account)
    const user = await this.service.getByUsername(username)
    await me.unfollow(user)
    return {
      profile: cloneProfileToOutput(user, account.email, false),
    }
  }

  @AuthIsOptional()
  @Get(':username')
  async getProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const profile = await this.service.getByUsername(username)
    return {
      profile: cloneProfileToOutput(profile, account.email),
    }
  }
}
