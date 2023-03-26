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
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Account } from './models'
import { AuthorsService } from './service'
import {
  cloneProfileToOutput,
  CreateProfileBody,
  ProfileResponseBody,
  UpdateProfileBody,
  Username,
} from './authors.dto'
import { InjectAccount } from '../accounts/account.decorator'
import { buildUrl } from '../nest/parsing/url'
import { AuthIsOptional, JWTAuthGuard } from '../nest/security/jwt.guard'
import { validateModel } from '../nest/validation/validation.utils'

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
    @Req() req,
    @InjectAccount() account: Account,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    return {
      profile: cloneProfileToOutput(req, me, undefined, {
        articles: buildUrl(req, 'articles', {
          author: me.username,
        }),
      }),
    }
  }

  @ApiCreatedResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Req() req,
    @InjectAccount() account: Account,
    @Body(validateModel()) body: CreateProfileBody,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.createForAccount(account, body.profile)
    return {
      profile: cloneProfileToOutput(req, me, undefined, {
        articles: buildUrl(req, 'articles', {
          author: me.username,
        }),
      }),
    }
  }

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @Put()
  async update(
    @Req() req,
    @InjectAccount() account: Account,
    @Body(validateModel()) body: CreateProfileBody,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.updateByAccount(account, body.profile)
    return {
      profile: cloneProfileToOutput(req, me, undefined, {
        articles: buildUrl(req, 'articles', {
          author: me.username,
        }),
      }),
    }
  }

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @Patch()
  async partialUpdate(
    @Req() req,
    @InjectAccount() account: Account,
    @Body(validateModel()) body: UpdateProfileBody,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.updateByAccount(account, body.profile)
    return {
      profile: cloneProfileToOutput(req, me, undefined, {
        articles: buildUrl(req, 'articles', {
          author: me.username,
        }),
      }),
    }
  }

  @ApiCreatedResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Username()
  @Post(':username/follow')
  async followProfile(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const profile = await this.authorsService.getByUsername(username)
    await me.follow(profile)
    return {
      profile: cloneProfileToOutput(req, profile, true, {
        articles: buildUrl(req, 'articles', {
          author: me.username,
        }),
      }),
    }
  }

  @ApiNoContentResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Username()
  @Delete(':username/follow')
  async unfollowProfile(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('username') username: string,
  ): Promise<ProfileResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const profile = await this.authorsService.getByUsername(username)
    await me.unfollow(profile)
    return {
      profile: cloneProfileToOutput(req, profile, false, {
        articles: buildUrl(req, 'articles', {
          author: me.username,
        }),
      }),
    }
  }

  @ApiOkResponse({ type: ProfileResponseBody })
  @HttpCode(HttpStatus.OK)
  @AuthIsOptional()
  @Username()
  @Get(':username')
  async getProfile(
    @Req() req,
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
      profile: cloneProfileToOutput(req, profile, following, {
        articles: buildUrl(req, 'articles', {
          author: profile.username,
        }),
      }),
    }
  }
}
