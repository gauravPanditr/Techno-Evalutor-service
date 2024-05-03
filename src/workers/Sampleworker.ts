import { Job, Worker } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { WorkerResponse } from "../types/bullMqWorkerResponse";
import SampleJob from "../jobs/SampleJob";
import redisConnection from "../config/redisConfig";

export default function SampleWorker (queueNmae :string){
    new Worker(
        queueNmae,
        async (job:Job)=>{
          if(job.name=="SampleJob"){
            const sampleJobInstance=new SampleJob(job.data);
            sampleJobInstance.handle(job);
             return true;
         
          }
        },{
            connection:redisConnection
        }
    );
}
