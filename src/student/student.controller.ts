import { Controller, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students') // The base route for the controller
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Put(':id') // Handle PUT requests with a parameterized ID
  async updateStudent(
    @Param('id') id: string, // Capture the ID from the route
    @Body() updateData: Partial<Student>, // Get the updated data from the request body
  ): Promise<Student> {
    const studentId = parseInt(id, 10);

    if (isNaN(studentId)) {
      throw new NotFoundException(`Invalid ID provided: ${id}`);
    }

    return this.studentService.updateStudent(studentId, updateData);
  }
}
