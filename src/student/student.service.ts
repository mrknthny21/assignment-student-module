import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // Create a new student
  async createStudent(firstName: string, lastName: string, email: string, enrollmentDate: Date): Promise<Student> {
    const student = this.studentRepository.create({
      firstName,
      lastName,
      email,
      enrollmentDate,
    });
    return this.studentRepository.save(student);
  }
}
