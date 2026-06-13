import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [JwtModule,
           TypeOrmModule.forFeature([Doctor,User])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}