import { Body, Controller, Post, Get, Patch, UseGuards, Req} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { FilterDoctorDto } from './dto/filter-doctor.dto';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  create(@Body() createDoctorDto: CreateDoctorDto,  @Req() req,) {
  console.log(req.user);
    return this.doctorService.create(createDoctorDto, req.user.id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  findProfile(@Req() req) {
    return this.doctorService.findProfile(req.user.id);
  }

   @Patch('profile/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('DOCTOR')
    update( @Param('id') id: number,
            @Body() createDoctorDto: CreateDoctorDto) {
      return this.doctorService.update(id, createDoctorDto);
    }
    @Get()
    findAll(
      @Query() filterDoctorDto: FilterDoctorDto,
    ) {
      return this.doctorService.findAll(filterDoctorDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.doctorService.findOne(+id);
    }
}