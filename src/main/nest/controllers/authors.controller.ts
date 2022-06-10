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
import { Account } from '../../domain/authors/models'
import { AuthorsService } from '../../domain/authors/service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  cloneProfileToOutput,
  CreateProfileDTO,
  ProfileResponseDTO,
  UpdateProfileDTO,
} from '../parsing/authors.dto'
import { AuthIsOptional, JWTAuthGuard } from '../security/jwt.guard'
import { validateModel } from '../validation/validation.utils'

@ApiTags('profiles')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller('profiles')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('me')
  async getCurrent(
    @InjectAccount() account: Account,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @Post()
  async create(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.authorsService.createForAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @Put()
  async update(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.authorsService.updateByAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @Patch()
  async partialUpdate(
    @InjectAccount() account: Account,
    @Body('profile', validateModel()) profile: UpdateProfileDTO,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.authorsService.updateByAccount(account, profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @Post(':username/follow')
  async followProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    const profile = await this.authorsService.getByUsername(username)
    await me.follow(profile)
    return {
      profile: cloneProfileToOutput(profile, true),
    }
  }

  @Delete(':username/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollowProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    const profile = await this.authorsService.getByUsername(username)
    await me.unfollow(profile)
    return {
      profile: cloneProfileToOutput(profile, false),
    }
  }

  @AuthIsOptional()
  @Get(':username')
  async getProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<{ profile: ProfileResponseDTO }> {
    const profile = await this.authorsService.getByUsername(username)
    let following: boolean
    if (account) {
      const me = await this.authorsService.getByAccount(account)
      following = await me.isFollowing(profile)
    }
    return {
      profile: cloneProfileToOutput(profile, following),
    }
  }
}
