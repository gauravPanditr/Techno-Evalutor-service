import express from "express";
import serverConfig from "./config/serverConfig";
import sameQueueproducer from "./producer/sameQueueproducer";
import SampleWorker from "./workers/Sampleworker";

const app = express();

app.listen(serverConfig.PORT || 3000, () => {
    console.log(`Server started at port ${serverConfig.PORT || 3000}`);
    
    SampleWorker('SampleQueue');
    sameQueueproducer('SampleJob',{
       name:"Navya",
       company:"Google",
       position:"SDE1" ,

    },1);
    sameQueueproducer('SampleJob',{
        name:"Gaurav",
        company:"TCS",
        position:"SDE1" ,

     },2)
     
    
});
