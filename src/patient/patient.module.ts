import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Patient, User])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}