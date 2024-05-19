//import Docker from 'dockerode';
import decodeDockerStream from './dockerhelper';
import createContainer from './containerFactory';
//import { TestCases } from '../types/testCases';
import { PYTHON_IMAGE } from '../utilis/constants';
const rawLogBuffer:Buffer[]=[];
async function runPython(code:string,inputTestCase:string) {
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 
    console.log("Initalizing new Docker");
    
   await pythonDockerContainer.start();
     
  const loggerStream= await pythonDockerContainer.logs({
      stdout:true,
      stderr:true,
      timestamps:false,
      follow:true

  });
   loggerStream.on('data',(chunk)=>{
    rawLogBuffer.push(chunk);  
 });
 await new Promise((res) => {
    loggerStream.on('end', () => {
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
        console.log(decodedStream.stdout);
        res(decodeDockerStream);
    });
});

// remove the container when done with it
await pythonDockerContainer.remove();

   

    return pythonDockerContainer;  
}
export default runPython;
