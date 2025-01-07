import { Controller, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Endpoint to create a student
  @Post()
  async create(@Body() body: { firstName: string, lastName: string, email: string, enrollmentDate: string }): Promise<Student> {
    const { firstName, lastName, email, enrollmentDate } = body;

    // Create the student by passing the data directly
    return this.studentService.createStudent(firstName, lastName, email, new Date(enrollmentDate));
  }
}