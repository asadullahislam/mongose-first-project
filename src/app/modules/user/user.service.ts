import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Student } from '../student/student.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  //your semester 4 digiy number

  const generateStudentId = async (payload: TAcademicSemester) => {};
  //set manually generated id
  userData.id = generateStudentId();

  //create a user

  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
