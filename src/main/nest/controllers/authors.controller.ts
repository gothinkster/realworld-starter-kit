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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Account } from '../../domain/authors/models'
import { AuthorsService } from '../../domain/authors/service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  cloneProfileToOutput,
  CreateProfileBody,
  ProfileResponseBody,
  UpdateProfileBody,
  Username,
} from '../parsing/authors.dto'
import { AuthIsOptional, JWTAuthGuard } from '../security/jwt.guard'
import { validateModel } from '../validation/validation.utils'

@ApiTags('profiles')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller('profiles')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getCurrent(
    @InjectAccount() account: Account,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @ApiCreatedResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @InjectAccount() account: Account,
    @Body(validateModel()) body: CreateProfileBody,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.createForAccount(account, body.profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @Put()
  async update(
    @InjectAccount() account: Account,
    @Body(validateModel()) body: CreateProfileBody,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.updateByAccount(account, body.profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @Patch()
  async partialUpdate(
    @InjectAccount() account: Account,
    @Body(validateModel()) body: UpdateProfileBody,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.updateByAccount(account, body.profile)
    return {
      profile: cloneProfileToOutput(me),
    }
  }

  @ApiCreatedResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Username()
  @Post(':username/follow')
  async followProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const profile = await this.authorsService.getByUsername(username)
    await me.follow(profile)
    return {
      profile: cloneProfileToOutput(profile, true),
    }
  }

  @ApiNoContentResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Username()
  @Delete(':username/follow')
  async unfollowProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const profile = await this.authorsService.getByUsername(username)
    await me.unfollow(profile)
    return {
      profile: cloneProfileToOutput(profile, false),
    }
  }

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @AuthIsOptional()
  @Username()
  @Get(':username')
  async getProfile(
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<ProfileResponseBody> {
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
