import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator'
import { Profile, ProfileFields } from '../../domain/authors/models'
import { buildUrl } from './pagination.dto'

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

  @ApiResponseProperty({ type: 'string', format: 'url' })
  $self: string

  @ApiResponseProperty({ type: 'string', format: 'url' })
  $articles: string
}

export class ProfileResponseBody {
  @ApiModelProperty()
  profile: ProfileResponseDTO
}

export function cloneProfileToOutput(
  req,
  profile: Profile,
  following?: boolean,
): ProfileResponseDTO {
  const output: ProfileResponseDTO = {
    $self: buildUrl(req, `/profiles/${profile.username}`),
    username: profile.username,
    bio: profile.bio,
    image: profile.image,
    $articles: buildUrl(req, `/articles?author=${profile.username}`),
  }
  if (typeof following === 'boolean') {
    output.following = following
  }
  return output
}

export function Username() {
  return applyDecorators(
    ApiParam({ name: 'username', ...authorSwaggerOptions.username }),
  )
}
