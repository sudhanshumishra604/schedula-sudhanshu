import { Injectable, ConflictException, NotFoundException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { User } from '../users/user.entity';
import { FilterDoctorDto } from './dto/filter-doctor.dto';
import { Like } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

     @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto, userId: number) {

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingDoctor = await this.doctorRepository.findOne({
      where: {
        fullName: createDoctorDto.fullName,
      },
    });

    if (existingDoctor) {
      throw new ConflictException('Doctor profile already exists');
    }

    const doctor = this.doctorRepository.create({
    ...createDoctorDto,
    user,
    });

    return await this.doctorRepository.save(doctor);
  }

  async findProfile(userId: number) {
    return this.doctorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });
  }

    async update(id : number, createDoctorDto: CreateDoctorDto) {
      const doctor = await this.doctorRepository.findOne({
        where: { id},
      });

      if (!doctor) {
        return {
          message: 'Doctor profile not found',
        };
      }

      Object.assign(doctor, createDoctorDto);

      return this.doctorRepository.save(doctor);
    }

    async findAll(filterDoctorDto: FilterDoctorDto) {

      const { specialization,
               search, page = 1,
               limit = 10, } = filterDoctorDto;

               if (page <= 0 || limit <= 0) {
                 throw new BadRequestException(
                   'Page and limit must be greater than 0',
                 );
               }

      if (specialization) {
        const doctors = await this.doctorRepository.find({
          where: {
            specialization,
          },
          skip: (page - 1) * limit,
          take: limit,
        });

        if (doctors.length === 0) {
          throw new NotFoundException(
            'No doctors found for this specialization',
          );
        }

        return doctors;
      }

      if (search) {
        const doctors = await this.doctorRepository.find({
          where: {
            fullName: Like(`%${search}%`),
          },
          skip: (page - 1) * limit,
          take: limit,
        });

        if (doctors.length === 0) {
          throw new NotFoundException(
            'No doctors found matching search',
          );
        }

        return doctors;
      }


     const doctors = await this.doctorRepository.find({
       skip: (page - 1) * limit,
       take: limit,
     });

     if (doctors.length === 0) {
       throw new NotFoundException('No doctors found');
     }

     return doctors;
    }

    async findOne(id: number) {
      const doctor = await this.doctorRepository.findOne({
        where: { id },
      });

      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      return doctor;
    }
}