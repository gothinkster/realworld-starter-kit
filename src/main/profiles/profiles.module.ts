import { Module } from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { ProfilesController } from './profiles.controller'

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
