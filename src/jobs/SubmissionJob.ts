import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";
import createExceutor from "../utilis/ExecutorFactory";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";

export default class SubmissionJob implements IJob{
    name: string;
    payload:Record<string,SubmissionPayload>;
    constructor(payload:Record<string,SubmissionPayload>){
        this.payload=payload;
        this.name=this.constructor.name;
    }
    handle = async (job?:Job)=>{
        console.log("Handler of job called");
        console.log(this.payload);
        if(job){
          const key=Object.keys(this.payload)[0];
          const codeLanguage=this.payload[key].language;
          const code=this.payload[key].code;
          
          const inputTestCase=this.payload[key].inputCase


          const streagty=createExceutor(codeLanguage);
          if(streagty !=null){
             const response:ExecutionResponse= await streagty.execute(code,inputTestCase);
             if(response.status==="COMPLETED"){
                console.log("Code executrd successfully");
                console.log(response);
                
             }
             else{
                console.log("Somehing went wrong");
                console.log(response);
                
                
             }
          }

        }

    };
     failed=(job?: Job):void=>{
        console.log("Job failed");
        if(job)
             console.log(job.id);
             
        
     }


}