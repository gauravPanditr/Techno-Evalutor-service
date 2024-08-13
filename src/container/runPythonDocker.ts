//import Docker from 'dockerode';
import decodeDockerStream from './dockerhelper';
import createContainer from './containerFactory';
//import { TestCases } from '../types/testCases';
import { PYTHON_IMAGE } from '../utilis/constants';
import pullImage from './pullImage';
import CodeExecutorStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';


class PythonExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string):Promise<ExecutionResponse> {
        const rawLogBuffer: Buffer[] = [];
        await pullImage(PYTHON_IMAGE);
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
        const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
            '/bin/sh',
            '-c',
            runCommand
        ]);
        console.log("Initalizing new Docker");

        await pythonDockerContainer.start();

        const loggerStream = await pythonDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true

        });
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });
        try {
            const Coderesponse:string = await this.fetchDecodedStream(loggerStream,rawLogBuffer);
            return {output :Coderesponse,status:"COMPLETED"};  
        } catch (error) {
           return {output:error as string ,status:"ERROR"} 
        }
        finally{
            await pythonDockerContainer.remove();

            
    
        }
        

        // remove the container when done with it
        

    }
 
     fetchDecodedStream(loggerStream:NodeJS.ReadableStream,rawLogBuffer:Buffer[]):Promise<string>{
return new Promise((res, rej) => {
    loggerStream.on('end', () => {
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
        console.log(decodedStream.stdout);
        if (decodedStream.stderr) {
            rej(decodedStream.stderr)
        }
        else {
            res(decodedStream.stdout);
        }


    });
});

     }




}




export default PythonExecutor;




