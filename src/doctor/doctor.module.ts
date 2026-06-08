import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [JwtModule],
  controllers: [DoctorController],
})
export class DoctorModule {}