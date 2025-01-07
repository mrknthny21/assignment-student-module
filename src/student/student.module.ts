import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],  // Register the Student entity with TypeORM
  providers: [StudentService],  // Register the StudentService to handle business logic
  controllers: [StudentController],  // Register the StudentController to handle HTTP requests
})
export class StudentModule {}
