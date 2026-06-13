import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';

export enum UserRole {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @OneToOne(() => Doctor, doctor => doctor.user)
  doctor: Doctor;

  @OneToOne(() => Patient, patient => patient.user)
  patient: Patient;
}