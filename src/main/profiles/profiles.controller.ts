import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { ProfilesCreateDTO, ProfilesUpdateDTO } from './profiles.dto'

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: ProfilesCreateDTO) {
    return this.profilesService.create(createProfileDto)
  }

  @Get()
  findAll() {
    return this.profilesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: ProfilesUpdateDTO) {
    return this.profilesService.update(+id, updateProfileDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id)
  }
}
