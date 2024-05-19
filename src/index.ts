import express from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";
import runPython from "./container/runPythonDocker";
import SampleWorker from "./workers/Sampleworker";


const app = express();



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(serverConfig.PORT || 3000, () => {
    console.log(`Server started at port ${serverConfig.PORT || 3000}`);

     SampleWorker('SampleQueue');
const code = `x = input()
y = input()
print("value of x is", x)
print("value of y is", y)
`;

     
     const inputCase = `100 
                        200
     `;
       
       runPython(code, inputCase);




    
});
