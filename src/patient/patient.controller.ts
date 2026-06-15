import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Param } from '@nestjs/common';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  create(@Body() createPatientDto: CreatePatientDto, @Req() req,) {
    return this.patientService.create(
      createPatientDto
    , req.user.id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  findProfile(@Req() req) {
    console.log(req.user);

    return this.patientService.findProfile(req.user.id);
  }

  @Patch('profile/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  update( @Param('id') id: number,
          @Body() createPatientDto: CreatePatientDto) {
    return this.patientService.update(id, createPatientDto);
  }
}