import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // Method to get all students from the database
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find(); // Query the database for all students
  }
}
