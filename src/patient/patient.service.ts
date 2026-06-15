import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

async create(createPatientDto: CreatePatientDto, userId: number) {

  const user = await this.userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const existingPatient = await this.patientRepository.findOne({
    where: {
      fullName: createPatientDto.fullName,
    },
  });

  if (existingPatient) {
    throw new ConflictException('Patient profile already exists');
  }

  const patient = this.patientRepository.create({
  ...createPatientDto,
  user,
  });

  return this.patientRepository.save(patient);
}

async findProfile(userId: number) {
  return this.patientRepository.findOne({
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


  async findAll() {
    return this.patientRepository.find();
  }

  async update(id: number, createPatientDto: CreatePatientDto) {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      return {
        message: 'Patient profile not found',
      };
    }

    Object.assign(patient, createPatientDto);

    return this.patientRepository.save(patient);
  }
}