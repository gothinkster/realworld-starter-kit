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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { buildUrlToPath } from '../nest/url'
import { AuthIsOptional, JWTAuthGuard } from '../nest/jwt.guard'
import { AuthorsService, Profile } from './authors.service'
import { z } from 'zod'
import { createZodTransformer } from '../nest/validation.utils'

const username = z
  .string()
  .regex(/^[A-Za-z0-9\-_]*$/)
  .describe('The author username')
const bio = z.string().describe('The author bio')
const image = z.string().url().describe('The author image url')

const CreateProfileDTO = z.object({
  username,
  bio,
  image,
})

const CreateProfileBody = z.object({
  profile: CreateProfileDTO,
})

type CreateProfileBody = z.infer<typeof CreateProfileBody>

const UpdateProfileDTO = z.object({
  username: username.optional(),
  bio: bio.optional(),
  image: image.optional(),
})

const UpdateProfileBody = z.object({
  profile: UpdateProfileDTO,
})

type UpdateProfileBody = z.infer<typeof UpdateProfileBody>

@ApiTags('profiles')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller('profiles')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getCurrent(@Req() req) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    return createAuthorProfileBody(req, me)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Req() req,
    @Body(createZodTransformer(CreateProfileBody)) body: CreateProfileBody,
  ) {
    const me = await this.authorsService.createUserAuthorProfile(
      req.user,
      body.profile,
    )
    return createAuthorProfileBody(req, me)
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  async update(
    @Req() req,
    @Body(createZodTransformer(CreateProfileBody)) body: CreateProfileBody,
  ) {
    const me = await this.authorsService.updateUserAuthorProfile(
      req.user,
      body.profile,
    )
    return createAuthorProfileBody(req, me)
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  async partialUpdate(
    @Req() req,
    @Body(createZodTransformer(UpdateProfileBody)) body: UpdateProfileBody,
  ) {
    const me = await this.authorsService.updateUserAuthorProfile(
      req.user,
      body.profile,
    )
    return createAuthorProfileBody(req, me)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':username/follow')
  async followProfile(@Req() req, @Param('username') username: string) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const profile = await this.authorsService.getAuthorByUsername(username)
    await me.follow(profile)
    return createAuthorProfileBody(req, profile, true)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':username/follow')
  async unfollowProfile(@Req() req, @Param('username') username: string) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const profile = await this.authorsService.getAuthorByUsername(username)
    await me.unfollow(profile)
    return createAuthorProfileBody(req, profile, false)
  }

  @HttpCode(HttpStatus.OK)
  @AuthIsOptional()
  @Get(':username')
  async getProfile(@Req() req, @Param('username') username: string) {
    const author = await this.authorsService.getAuthorByUsername(username)
    let following: boolean | undefined = undefined
    if (req.user) {
      const me = await this.authorsService.getUserAuthorProfile(req.user)
      following = await me.isFollowing(author)
    }
    return createAuthorProfileBody(req, author, following)
  }
}

function createAuthorProfileBody(
  req: Request,
  author: Profile,
  following?: boolean,
) {
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
