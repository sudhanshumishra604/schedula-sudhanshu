import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'schedula',
      autoLoadEntities: true,
      synchronize: true,
    }),
     UsersModule,

     JwtModule.register({
       secret: 'mySecretKey',
     }),
     AuthModule,
     DoctorModule,
     PatientModule,
  ],
})
export class AppModule {}