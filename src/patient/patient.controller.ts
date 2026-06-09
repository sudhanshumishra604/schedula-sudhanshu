import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('patient')
export class PatientController {
  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  getProfile() {
    return {
      message: 'Patient profile accessed',
    };
  }
}