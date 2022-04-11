import { Injectable } from '@nestjs/common'
import { ProfilesCreateDTO, ProfilesUpdateDTO } from './profiles.dto'

@Injectable()
export class ProfilesService {
  create(createProfileDto: ProfilesCreateDTO) {
    return 'This action adds a new profile'
  }

  findAll() {
    return `This action returns all profiles`
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`
  }

  update(id: number, updateProfileDto: ProfilesUpdateDTO) {
    return `This action updates a #${id} profile`
  }

  remove(id: number) {
    return `This action removes a #${id} profile`
  }
}
