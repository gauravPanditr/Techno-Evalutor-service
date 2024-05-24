//import Docker from 'dockerode';
import decodeDockerStream from './dockerhelper';
import createContainer from './containerFactory';
//import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from '../utilis/constants';
import pullImage from './pullImage';

async function runJava(code:string,inputTestCase:string) {
    const rawLogBuffer:Buffer[]=[];
    await pullImage(JAVA_IMAGE)

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java  && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 
    console.log("Initalizing new Docker");
    
   await javaDockerContainer.start();
     
  const loggerStream= await javaDockerContainer.logs({
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
await javaDockerContainer.remove();

   

    return javaDockerContainer;  
}
export default runJava;
