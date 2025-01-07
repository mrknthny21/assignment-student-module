import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/student.entity';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { StudentModule } from './student/student.module'; // Import the StudentModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type (MySQL in this case)
      host: 'localhost', // Database host
      port: 3306, // Database port
      username: 'root', // Database username
      password: '', // Database password
      database: 'student_db', // Name of the database
      entities: [Student], // Define the entities here
      synchronize: true, // Automatically create database tables, set to false in production
    }),
    StudentModule, // Import StudentModule here instead of declaring the controller and service again
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
