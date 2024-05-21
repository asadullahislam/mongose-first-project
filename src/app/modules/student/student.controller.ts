import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //creating a schema validation using Joi
    //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zod
    const zodparsedData = studentValidationSchema.parse(studentData);

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodparsedData);

    // if (error) {
    //   res.status(200).json({
    //     success: false,
    //     message: 'someting went wrong',
    //     error: error.details,
    //   });
    // }

    //send respose

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully  ',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully  ',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
