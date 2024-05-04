import express from "express";
import { addSubmission } from "../../controller/submissionController";
import { validate } from "../../validators/createSubmissionvalidator";
import { CreateSubmissionZodSchema } from "../../dtos/CreateSubmission";

const submissionRouter = express.Router();
submissionRouter .post('/',
 validate(CreateSubmissionZodSchema),
addSubmission);

export default submissionRouter ;