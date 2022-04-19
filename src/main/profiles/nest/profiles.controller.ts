import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JWTAuthGuard } from '../../utils/jwt.guard'
import { validateModel } from '../../utils/validation.utils'
import {
  CreateProfileDTO,
  OwnProfileResponseDTO,
  ProfileResponseDTO,
  ProfileResponsePayload,
  UpdateProfileDTO,
} from './profiles.dto'

@ApiTags('profiles')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesLifecycleController {
  @Get('me')
  getCurrent(): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Post()
  create(
    @Body('profile', validateModel()) profile: CreateProfileDTO,
  ): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Put()
  update(
    @Body('profile', validateModel()) profile: UpdateProfileDTO,
  ): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Post(':username/follow')
  followProfile(
    @Param() username: string,
  ): ProfileResponsePayload<ProfileResponseDTO> {
    return undefined
  }

  @Delete(':username/follow')
  unfollowProfile(
    @Param() username: string,
  ): ProfileResponsePayload<ProfileResponseDTO> {
    return undefined
  }
}

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesViewsController {
  @Get(':username')
  getProfile(
    @Param() username: string,
  ): ProfileResponsePayload<ProfileResponseDTO> {
    return undefined
  }
}
