import {
  applyDecorators,
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
  ApiParam,
  ApiProperty,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger'
import { Account, Profile, ProfileFields } from './models'
import { AuthorsService } from './service'
import { InjectAccount } from '../accounts/account.decorator'
import { buildUrlToPath } from '../nest/url'
import { AuthIsOptional, JWTAuthGuard } from '../nest/jwt.guard'
import { validateModel } from '../nest/validation.utils'
import { IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'
import { Type } from 'class-transformer'

const authorSwaggerOptions = {
  username: {
    description: 'The author username',
  },
  bio: {
    description: 'The author bio',
  },
  image: {
    description: 'The author image',
    type: 'string',
    format: 'url',
  },
}

export class CreateProfileDTO implements ProfileFields {
  @ApiProperty({ ...authorSwaggerOptions.username, required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(String.raw`^[A-Za-z0-9\-\_]*$`, '', {
    message:
      'The username should contain only letters, numbers, traces and underscores.',
  })
  username: string

  @ApiProperty({ ...authorSwaggerOptions.bio, required: true })
  @IsString()
  bio: string

  @ApiProperty({ ...authorSwaggerOptions.image, required: true })
  @IsString()
  @IsNotEmpty()
  image: string
}

export class CreateProfileBody {
  @ApiModelProperty({ type: CreateProfileDTO, required: true })
  @ValidateNested()
  @Type(() => CreateProfileDTO)
  profile: CreateProfileDTO
}

export class UpdateProfileDTO implements ProfileFields {
  @ApiProperty({ ...authorSwaggerOptions.username })
  @IsString()
  @IsNotEmpty()
  @Matches(String.raw`^[A-Za-z0-9\-\_]*$`, '', {
    message:
      'The username should contain only letters, numbers, traces and underscores.',
  })
  username: string

  @ApiProperty({ ...authorSwaggerOptions.bio })
  @IsString()
  bio: string

  @ApiProperty({ ...authorSwaggerOptions.image })
  @IsString()
  @IsNotEmpty()
  image: string
}

export class UpdateProfileBody {
  @ApiModelProperty({ type: UpdateProfileDTO, required: true })
  @ValidateNested()
  @Type(() => UpdateProfileDTO)
  profile: UpdateProfileDTO
}

export class ProfileResponseDTO implements ProfileFields {
  @ApiResponseProperty()
  username: string

  @ApiResponseProperty()
  bio: string

  @ApiResponseProperty()
  image: string

  @ApiResponseProperty()
  following?: boolean

  @ApiResponseProperty()
  links?: {
    [key: string]: string
  }
}

export class ProfileResponseBody {
  @ApiModelProperty()
  profile: ProfileResponseDTO
}

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
    return createAuthorProfileBody(req, me)
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
    return createAuthorProfileBody(req, me)
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
    return createAuthorProfileBody(req, me)
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
    return createAuthorProfileBody(req, me)
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
    return createAuthorProfileBody(req, profile, true)
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
    return createAuthorProfileBody(req, profile, false)
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
    const author = await this.authorsService.getByUsername(username)
    let following: boolean
    if (account) {
      const me = await this.authorsService.getByAccount(account)
      following = await me.isFollowing(author)
    }
    return createAuthorProfileBody(req, author, following)
  }
}

function createAuthorProfileBody(
  req: Request,
  author?: Profile,
  following?: boolean,
): ProfileResponseBody {
  return {
    profile: {
      ...createAuthorDTO(req, author, following),
      links: {
        articles: buildUrlToPath(req, 'articles', {
          author: author.username,
        }),
      },
    },
  } as const
}

export function createAuthorDTO(req, author: Profile, following?: boolean) {
  return {
    username: author.username,
    bio: author.bio,
    image: author.image,
    ...(following !== undefined ? { following } : {}),
  } as const
}

export function Username() {
  return applyDecorators(
    ApiParam({ name: 'username', ...authorSwaggerOptions.username }),
  )
}
