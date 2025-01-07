import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // Create a new student
  async createStudent(
    firstName: string,
    lastName: string,
    email: string,
    enrollmentDate: Date,
  ): Promise<Student> {
    const newStudent = this.studentRepository.create({
      firstName,
      lastName,
      email,
      enrollmentDate,
    });

    return this.studentRepository.save(newStudent);
  }

  // Get all students
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  // Get a specific student by ID
  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id }, // Correct format for the query
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  // Update a student by ID
  async updateStudent(
    id: number,
    updateData: { firstName: string, lastName: string, email: string, enrollmentDate: string },
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id }, // Correct format for the query
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    // Update student properties
    student.firstName = updateData.firstName;
    student.lastName = updateData.lastName;
    student.email = updateData.email;
    student.enrollmentDate = new Date(updateData.enrollmentDate);

    return this.studentRepository.save(student);
  }

  // Delete a student by ID
  async deleteStudent(id: number): Promise<void> {
    const student = await this.studentRepository.findOne({
      where: { id }, // Correct format for the query
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    await this.studentRepository.remove(student);
  }
}
