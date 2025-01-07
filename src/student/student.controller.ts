import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students') // The base route for the controller
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Delete(':id') // Handle DELETE requests with a parameterized ID
  async deleteStudent(
    @Param('id') id: string, // Capture the ID from the route
  ): Promise<{ message: string }> {
    const studentId = parseInt(id, 10);

    if (isNaN(studentId)) {
      throw new NotFoundException(`Invalid ID provided: ${id}`);
    }

    await this.studentService.deleteStudent(studentId);

    return { message: `Student with ID ${studentId} has been deleted successfully` };
  }
}
