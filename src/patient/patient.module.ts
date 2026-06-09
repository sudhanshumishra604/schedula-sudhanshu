import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientController } from './patient.controller';

@Module({
  imports: [JwtModule],
  controllers: [PatientController],
})
export class PatientModule {}