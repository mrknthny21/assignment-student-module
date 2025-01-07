import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')  // Make sure this is the right route
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Handle GET request to fetch all students
  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents(); // Call service method to get students
  }
}
