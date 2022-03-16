import { Injectable } from '@nestjs/common';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class MeService {
  getMe(id: number) {
    return `This action returns a #${id} me`;
  }

  // updateMe(id: number, updateMeDto: UpdateMeDto) {
  //   return `This action updates a #${id} me`;
  // }

  // removeMe(id: number) {
  //   return `This action removes a #${id} me`;
  // }
}
