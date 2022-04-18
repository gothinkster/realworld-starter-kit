import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common'
import {
  OwnProfileResponseDTO,
  ProfileCreateDTO,
  ProfileResponseDTO,
  ProfileResponsePayload,
  ProfileUpdateDTO,
} from './profiles.dto'
import { validateModel } from '../../utils/validation.utils'
import { JWTAuthGuard } from '../../utils/jwt.guard'

@UseGuards(JWTAuthGuard)
@Controller('profiles')
export class ProfilesLifecycleController {
  @Get()
  getCurrent(): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Post()
  create(
    @Body('profile', validateModel()) profile: ProfileCreateDTO,
  ): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Patch()
  @Put()
  update(
    @Body('profile', validateModel()) profile: ProfileUpdateDTO,
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

@Controller('profiles')
export class ProfilesViewsController {
  @Get(':username')
  getProfile(
    @Param() username: string,
  ): ProfileResponsePayload<ProfileResponseDTO> {
    return undefined
  }
}
