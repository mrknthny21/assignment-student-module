import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')  // The base route for the controller
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Handle POST request to create a student
  @Post()
  async create(@Body() body: { firstName: string, lastName: string, email: string, enrollmentDate: string }): Promise<Student> {
    const { firstName, lastName, email, enrollmentDate } = body;

    // Create the student by passing the data directly
    return this.studentService.createStudent(firstName, lastName, email, new Date(enrollmentDate));
  }

  // Handle GET request to fetch all students
  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();  // Call service method to get students
  }

  // Handle GET request to fetch a specific student by ID
  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<Student> {
    const studentId = parseInt(id, 10);

    if (isNaN(studentId)) {
      throw new NotFoundException(`Invalid ID provided: ${id}`);
    }

    const student = await this.studentService.getStudentById(studentId);
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return student;
  }

  // Handle PUT request to update a student by ID
  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() updateData: { firstName: string, lastName: string, email: string, enrollmentDate: string }
  ): Promise<Student> {
    const studentId = parseInt(id, 10);

    if (isNaN(studentId)) {
      throw new NotFoundException(`Invalid ID provided: ${id}`);
    }

    return this.studentService.updateStudent(studentId, updateData);
  }

  // Handle DELETE request to delete a student by ID
  @Delete(':id')  // Handle DELETE requests with a parameterized ID
  async deleteStudent(@Param('id') id: string): Promise<{ message: string }> {
    const studentId = parseInt(id, 10);

    if (isNaN(studentId)) {
      throw new NotFoundException(`Invalid ID provided: ${id}`);
    }

    await this.studentService.deleteStudent(studentId);

    return { message: `Student with ID ${studentId} has been deleted successfully` };
  }
}
