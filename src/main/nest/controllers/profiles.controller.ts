import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
      profile: cloneProfileToOutput(me),
    }
  }

  @Post()
  async create(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.createForAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @Put()
  async update(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.updateByAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @Patch()
  async partialUpdate(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: UpdateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.updateByAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me),
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
      profile: cloneProfileToOutput(user, true),
    }
  }

  @Delete(':username/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollowProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.service.getByAccount(account)
    const user = await this.service.getByUsername(username)
    await me.unfollow(user)
    return {
      profile: cloneProfileToOutput(user, false),
    }
  }

  @AuthIsOptional()
  @Get(':username')
  async getProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const profile = await this.service.getByUsername(username)
    let following: boolean
    if (account) {
      const me = await this.service.getByAccount(account)
      following = await me.isFollowing(profile)
    }
    return {
      profile: cloneProfileToOutput(profile, following),
    }
  }
}
