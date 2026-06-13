import { Injectable, ConflictException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { User } from '../users/user.entity';

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

    async findAll() {
      return await this.doctorRepository.find();
    }
}