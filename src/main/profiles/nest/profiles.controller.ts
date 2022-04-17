import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Put,
  Body,
} from '@nestjs/common'
import {
  OwnProfileResponseDTO,
  ProfileCreatePayload,
  ProfileResponseDTO,
  ProfileResponsePayload,
  ProfileUpdatePayload,
} from './profiles.dto'
import { validateModel } from '../../utils/validation.utils'

@Controller('profiles')
export class ProfilesLifecycleController {
  @Get()
  getCurrent(): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Post()
  create(
    @Body(validateModel()) profile: ProfileCreatePayload,
  ): ProfileResponsePayload<OwnProfileResponseDTO> {
    return undefined
  }

  @Patch()
  @Put()
  update(
    @Body(validateModel()) profile: ProfileUpdatePayload,
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
