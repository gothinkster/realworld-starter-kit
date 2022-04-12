import { Controller, Get, Post, Param, Delete } from '@nestjs/common'
import { ProfileResponsePayload } from '../dtos/profiles.dto'

@Controller('profiles')
export class ProfilesController {
  @Get(':username')
  getProfile(@Param() username: string): ProfileResponsePayload {
    return undefined
  }

  @Post(':username/follow')
  followProfile(@Param() username: string): ProfileResponsePayload {
    return undefined
  }

  @Delete(':username/follow')
  unfollowProfile(@Param() username: string): ProfileResponsePayload {
    return undefined
  }
}
