import { Request,Response } from "express";
import { CreateSubmissionDto } from "../dtos/CreateSubmission";


export function addSubmission(req:Request,res:Response){
   const submission=req.body as CreateSubmissionDto

   return res.status(201).json({
    success:true,
    error:{},
    message:'Successfully collected the submission',
    data: submission
   })


}