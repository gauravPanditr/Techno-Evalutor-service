//import Docker from 'dockerode';
import decodeDockerStream from './dockerhelper';
import createContainer from './containerFactory';
//import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utilis/constants';
import pullImage from './pullImage';


async function runCpp(code:string,inputTestCase:string) {
    const rawLogBuffer:Buffer[]=[];
    await pullImage(CPP_IMAGE);
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main  && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 
    console.log("Initalizing new Docker");
    
   await cppDockerContainer.start();
     
  const loggerStream= await cppDockerContainer.logs({
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


await cppDockerContainer.remove();

   

    return cppDockerContainer;  
}
export default runCpp;
